const getZod = () => {
  try {
    // Avoid bundler-time resolution when zod isn't installed.
    // If the user installs zod, we will use it automatically.
    return eval("require")("zod");
  } catch {
    return null;
  }
};

const isBlank = value => !value || String(value).trim().length === 0;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const normalizePhone = value => String(value || "").replace(/[^\d]/g, "");

const isValidPhone = value => {
  const digits = normalizePhone(value);
  // Accept 10+ digits to allow country code, extensions, etc.
  return digits.length >= 10;
};

const isValidDate = value => /^\d{4}-\d{2}-\d{2}$/.test(String(value || ""));
const isValidTime = value => /^\d{2}:00$/.test(String(value || ""));

const isPastLocalDate = value => {
  if (!isValidDate(value)) return false;
  const [y, m, d] = String(value).split("-").map(Number);
  const selected = new Date(y, (m || 1) - 1, d || 1);
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return selected < todayStart;
};

const manualValidate = values => {
  const errors = {};

  if (isBlank(values.fullName)) errors.fullName = "Full name is required";
  if (isBlank(values.city)) errors.city = "City is required";
  if (isBlank(values.state)) errors.state = "State is required";

  if (isBlank(values.preferredContact)) {
    errors.preferredContact = "Preferred contact is required";
  } else if (!["phone", "email"].includes(values.preferredContact)) {
    errors.preferredContact = "Invalid preferred contact";
  }

  if (isBlank(values.eventDate)) errors.eventDate = "Event date is required";
  else if (!isValidDate(values.eventDate)) errors.eventDate = "Use a valid date";
  else if (isPastLocalDate(values.eventDate)) errors.eventDate = "Event date cannot be in the past";

  if (isBlank(values.eventTime)) errors.eventTime = "Event time is required";
  else if (!isValidTime(values.eventTime)) errors.eventTime = "Use a valid time";

  const requiresPhone = values.preferredContact === "phone";
  const requiresEmail = values.preferredContact === "email";

  if (requiresPhone) {
    if (isBlank(values.phone)) errors.phone = "Phone number is required";
    else if (!isValidPhone(values.phone)) errors.phone = "Use a valid phone number";
  } else if (!isBlank(values.phone) && !isValidPhone(values.phone)) {
    errors.phone = "Use a valid phone number";
  }

  if (requiresEmail) {
    if (isBlank(values.email)) errors.email = "Email address is required";
    else if (!emailRegex.test(String(values.email || ""))) errors.email = "Use a valid email address";
  } else if (!isBlank(values.email) && !emailRegex.test(String(values.email || ""))) {
    errors.email = "Use a valid email address";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: {
      ...values,
      fullName: String(values.fullName || "").trim(),
      city: String(values.city || "").trim(),
      state: String(values.state || "").trim(),
      email: String(values.email || "").trim(),
      phone: String(values.phone || "").trim()
    }
  };
};

export const validateInquiry = values => {
  const zod = getZod();
  if (!zod) return manualValidate(values);

  const { z } = zod;
  const schema = z
    .object({
      fullName: z.string().trim().min(1, "Full name is required"),
      city: z.string().trim().min(1, "City is required"),
      state: z.string().trim().min(1, "State is required"),
      preferredContact: z.enum(["phone", "email"], {
        required_error: "Preferred contact is required"
      }),
      phone: z.string().optional(),
      email: z.string().trim().optional(),
      eventDate: z.string().min(1, "Event date is required"),
      eventTime: z.string().min(1, "Event time is required")
    })
    .superRefine((data, ctx) => {
      if (!isValidDate(data.eventDate)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["eventDate"], message: "Use a valid date" });
      } else if (isPastLocalDate(data.eventDate)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["eventDate"], message: "Event date cannot be in the past" });
      }
      if (!isValidTime(data.eventTime)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["eventTime"], message: "Use a valid time" });
      }

      if (data.preferredContact === "phone") {
        if (isBlank(data.phone)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message: "Phone number is required" });
        } else if (!isValidPhone(data.phone)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message: "Use a valid phone number" });
        }
      } else if (!isBlank(data.phone) && !isValidPhone(data.phone)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["phone"], message: "Use a valid phone number" });
      }

      if (data.preferredContact === "email") {
        if (isBlank(data.email)) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: "Email address is required" });
        } else if (!emailRegex.test(String(data.email || ""))) {
          ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: "Use a valid email address" });
        }
      } else if (!isBlank(data.email) && !emailRegex.test(String(data.email || ""))) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ["email"], message: "Use a valid email address" });
      }
    });

  const parsed = schema.safeParse(values);
  if (parsed.success) return { valid: true, errors: {}, data: parsed.data };

  const errors = {};
  for (const issue of parsed.error.issues) {
    const key = issue.path?.[0];
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return { valid: false, errors, data: values };
};
