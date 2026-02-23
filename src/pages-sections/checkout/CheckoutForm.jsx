import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button, FormControl, FormControlLabel, FormLabel, Grid, MenuItem, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import Card1 from "components/Card1";
import { useAppContext } from "contexts/AppContext";
import { useSnackbar } from "notistack";
import { validateInquiry } from "utils/inquiryValidation";
import { sendInquiryEmail } from "utils/emailjs";
import { currency } from "lib";
import usStates from "data/usStates";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { format } from "date-fns";

const initialValues = {
  fullName: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  preferredContact: "phone",
  eventDate: "",
  eventTime: "",
  // Honeypot (hidden). Bots often fill every field.
  website: ""
};

const textFieldSx = {
  "& .MuiOutlinedInput-input": {
    color: "#F8FAFC"
  },
  "& .MuiOutlinedInput-input::placeholder": {
    color: "#F8FAFC",
    opacity: 1
  },
  "& .MuiSelect-select": {
    color: "#F8FAFC"
  },
  "& .MuiSvgIcon-root": {
    color: "rgba(248, 250, 252, 0.9)"
  }
};

const pad2 = value => String(value).padStart(2, "0");
const toLocalISODate = date => {
  const d = date || new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
};

const fromLocalISODate = value => {
  const [y, m, d] = String(value || "").split("-").map(Number);
  if (!y || !m || !d) return null;
  return new Date(y, m - 1, d);
};

const buildHourOptions = () => {
  // Default rental window; adjust if needed.
  const startHour = 8;
  const endHour = 20;
  const options = [];

  for (let hour = startHour; hour <= endHour; hour += 1) {
    options.push(`${pad2(hour)}:00`);
  }
  return options;
};

const formatHour = value => {
  const [hStr, mStr] = String(value || "").split(":");
  const hour = Number(hStr);
  const minute = Number(mStr);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return value;
  const suffix = hour >= 12 ? "PM" : "AM";
  const displayHour = ((hour + 11) % 12) + 1;
  return `${displayHour}:${pad2(minute)} ${suffix}`;
};

const CheckoutForm = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useAppContext();
  const cartList = state.cart;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const hourOptions = buildHourOptions();
  const requiredHelperSx = { color: "error.main", fontWeight: 800 };

  const getTotalPrice = () => cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  const hasCallForPrice = cartList.some(item => item.price <= 0);
  const totalLabel = hasCallForPrice ? "Call for pricing" : currency(getTotalPrice());

  const handleFormSubmit = async values => {
    if (cartList.length === 0) {
      enqueueSnackbar("Your cart is empty.", { variant: "warning" });
      router.push("/#rentals");
      return;
    }

    const validated = validateInquiry(values);
    if (!validated.valid) {
      enqueueSnackbar("Please fix the highlighted fields.", { variant: "error" });
      return;
    }

    setIsSubmitting(true);
    try {
      await sendInquiryEmail({
        inquiry: validated.data,
        cartList,
        totalLabel
      });

      enqueueSnackbar("Inquiry sent! We'll follow up shortly.", { variant: "success" });
      router.push("/order-confirmation");
    } catch (error) {
      enqueueSnackbar(error?.message || "Failed to send inquiry.", { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartList.length === 0) {
    return (
      <Card1>
        <Typography fontWeight="800" mb={1} color="warning.main">
          Your cart is empty
        </Typography>
        <Typography color="grey.200" mb={2}>
          Add rentals to your cart, then come back here to send an inquiry.
        </Typography>
        <Link href="/#rentals" passHref>
          <Button color="warning" variant="contained">
            Browse rentals
          </Button>
        </Link>
      </Card1>
    );
  }

  return (
    <Formik
      initialValues={initialValues}
      validate={values => validateInquiry(values).errors}
      onSubmit={handleFormSubmit}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue, setFieldTouched }) => (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="website"
            value={values.website}
            onChange={handleChange}
            onBlur={handleBlur}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
          />
          <Card1 sx={{ mb: 4 }}>
            <Typography fontWeight="800" mb={0.5} color="warning.main">
              Send Inquiry
            </Typography>
            <Typography color="grey.200" mb={3}>
              Tell us your event date/time and the best way to reach you.
            </Typography>

            <Grid container spacing={3}>
	              <Grid item sm={6} xs={12}>
	                <TextField
	                  fullWidth
	                  required
	                  placeholder="Full Name"
	                  name="fullName"
	                  onBlur={handleBlur}
	                  onChange={handleChange}
	                  value={values.fullName}
	                  error={!!touched.fullName && !!errors.fullName}
	                  helperText={touched.fullName && errors.fullName}
	                  inputProps={{ "aria-label": "Full Name" }}
	                  sx={textFieldSx}
	                />
	              </Grid>

              <Grid item sm={6} xs={12}>
                <FormControl component="fieldset" sx={{ width: "100%" }}>
                  <FormLabel sx={{ color: "grey.200", mb: 0.5 }}>Preferred Contact</FormLabel>
                  <RadioGroup
                    row
                    name="preferredContact"
                    value={values.preferredContact}
                    onChange={e => setFieldValue("preferredContact", e.target.value)}
                  >
                    <FormControlLabel value="phone" control={<Radio color="warning" />} label="Phone" />
                    <FormControlLabel value="email" control={<Radio color="warning" />} label="Email" />
                  </RadioGroup>
                  {errors.preferredContact && (
                    <Typography variant="caption" color="error">
                      {errors.preferredContact}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  required={values.preferredContact === "phone"}
                  placeholder="Phone Number"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  error={!!touched.phone && !!errors.phone}
                  helperText={
                    touched.phone && errors.phone
                      ? errors.phone
                      : values.preferredContact === "phone" && !String(values.phone || "").trim()
                        ? "Required"
                        : ""
                  }
                  FormHelperTextProps={
                    values.preferredContact === "phone" && !String(values.phone || "").trim() && !errors.phone
                      ? { sx: requiredHelperSx }
                      : undefined
                  }
                  inputProps={{ "aria-label": "Phone Number" }}
                  sx={textFieldSx}
                />
              </Grid>

              <Grid item sm={6} xs={12}>
                <TextField
                  fullWidth
                  required={values.preferredContact === "email"}
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  error={!!touched.email && !!errors.email}
                  helperText={
                    touched.email && errors.email
                      ? errors.email
                      : values.preferredContact === "email" && !String(values.email || "").trim()
                        ? "Required"
                        : ""
                  }
                  FormHelperTextProps={
                    values.preferredContact === "email" && !String(values.email || "").trim() && !errors.email
                      ? { sx: requiredHelperSx }
                      : undefined
                  }
                  inputProps={{ "aria-label": "Email Address" }}
                  sx={textFieldSx}
                />
              </Grid>

	              <Grid item sm={6} xs={12}>
	                <TextField
	                  fullWidth
	                  required
	                  placeholder="City"
	                  name="city"
	                  onBlur={handleBlur}
	                  onChange={handleChange}
	                  value={values.city}
	                  error={!!touched.city && !!errors.city}
	                  helperText={touched.city && errors.city}
	                  inputProps={{ "aria-label": "City" }}
	                  sx={textFieldSx}
	                />
	              </Grid>

	              <Grid item sm={6} xs={12}>
	                <TextField
	                  select
	                  fullWidth
	                  required
	                  name="state"
	                  onBlur={handleBlur}
	                  onChange={handleChange}
	                  value={values.state}
	                  error={!!touched.state && !!errors.state}
	                  helperText={touched.state && errors.state}
	                  SelectProps={{
	                    displayEmpty: true,
	                    renderValue: selected => selected || "Select a state"
	                  }}
	                  inputProps={{ "aria-label": "State" }}
	                  sx={textFieldSx}
	                >
                  <MenuItem value="" disabled>
                    Select a state
                  </MenuItem>
                  {usStates.map(s => (
                    <MenuItem key={s.code} value={s.code}>
                      {s.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

	              <Grid item sm={6} xs={12}>
	                <LocalizationProvider dateAdapter={AdapterDateFns}>
	                  <DatePicker
	                    disablePast
	                    inputFormat="MM/dd/yyyy"
	                    value={values.eventDate ? fromLocalISODate(values.eventDate) : null}
	                    onChange={value => {
	                      if (!value) {
                        setFieldValue("eventDate", "");
                        return;
                      }
                      setFieldValue("eventDate", format(value, "yyyy-MM-dd"));
                    }}
	                    renderInput={params => (
	                      <TextField
	                        {...params}
	                        fullWidth
	                        required
	                        name="eventDate"
	                        onBlur={() => setFieldTouched("eventDate", true, true)}
	                        error={!!touched.eventDate && !!errors.eventDate}
	                        helperText={touched.eventDate && errors.eventDate}
	                        inputProps={{
	                          ...params.inputProps,
	                          placeholder: "Rental Date",
	                          "aria-label": "Rental Date"
	                        }}
	                        sx={textFieldSx}
	                      />
	                    )}
                    PopperProps={{
                      placement: "bottom-start"
                    }}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        overflow: "hidden",
                        borderRadius: 4,
                        border: "1px solid rgba(255, 255, 255, 0.16)",
                        background:
                          "linear-gradient(180deg, rgba(10, 16, 26, 0.82) 0%, rgba(10, 16, 26, 0.68) 100%)",
                        backdropFilter: "blur(18px)",
                        boxShadow: "0 24px 60px rgba(2, 6, 23, 0.55)",
                        "& .MuiPickersCalendarHeader-root": {
                          px: 2,
                          pt: 1.5
                        },
                        "& .MuiPickersCalendarHeader-label": {
                          fontWeight: 900,
                          color: "#F8FAFC"
                        },
                        "& .MuiPickersArrowSwitcher-button": {
                          width: 40,
                          height: 40,
                          borderRadius: 999,
                          backgroundColor: "rgba(8, 12, 18, 0.35)",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          color: "#F8FAFC",
                          ":hover": { backgroundColor: "rgba(240, 216, 24, 0.15)" }
                        },
                        "& .MuiDayPicker-weekDayLabel": {
                          color: "rgba(226, 232, 240, 0.82)",
                          fontWeight: 800
                        },
                        "& .MuiPickersDay-root": {
                          width: 40,
                          height: 40,
                          margin: "2px",
                          fontWeight: 800,
                          color: "#F8FAFC",
                          backgroundColor: "rgba(255, 255, 255, 0.06)",
                          ":hover": { backgroundColor: "rgba(240, 216, 24, 0.18)" }
                        },
                        "& .MuiPickersDay-root.Mui-selected": {
                          backgroundColor: "rgba(240, 216, 24, 0.95) !important",
                          color: "rgba(8, 12, 18, 0.95) !important",
                          ":hover": { backgroundColor: "rgba(240, 216, 24, 1) !important" }
                        },
                        "& .MuiPickersDay-root.MuiPickersDay-today": {
                          borderColor: "rgba(240, 216, 24, 0.7)"
                        },
                        "& .MuiPickersDay-root.Mui-disabled": {
                          color: "rgba(226, 232, 240, 0.35)",
                          backgroundColor: "rgba(255, 255, 255, 0.03)"
                        }
                      }
                    }}
                    minDate={new Date()}
                  />
                </LocalizationProvider>
              </Grid>

	              <Grid item sm={6} xs={12}>
	                <TextField
	                  select
	                  fullWidth
	                  required
	                  name="eventTime"
	                  onBlur={handleBlur}
	                  onChange={handleChange}
	                  value={values.eventTime}
	                  error={!!touched.eventTime && !!errors.eventTime}
	                  helperText={touched.eventTime && errors.eventTime}
	                  SelectProps={{
	                    displayEmpty: true,
	                    renderValue: selected => (selected ? formatHour(selected) : "Select a time")
	                  }}
	                  inputProps={{ "aria-label": "Tentative Time" }}
	                  sx={textFieldSx}
	                >
                  <MenuItem value="" disabled>
                    Select a time
                  </MenuItem>
                  {hourOptions.map(value => (
                    <MenuItem key={value} value={value}>
                      {formatHour(value)}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Card1>

          <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
              <Link href="/cart" passHref>
                <Button variant="outlined" color="warning" type="button" fullWidth disabled={isSubmitting}>
                  Back to Cart
                </Button>
              </Link>
            </Grid>

            <Grid item sm={6} xs={12}>
              <Button variant="contained" color="warning" type="submit" fullWidth disabled={isSubmitting} sx={{ fontWeight: 800 }}>
                {isSubmitting ? "Sending..." : "Submit Query"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};

export default CheckoutForm;
