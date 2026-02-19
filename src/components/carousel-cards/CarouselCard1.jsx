import { Button, Grid, styled } from "@mui/material";
import BazaarImage from "components/BazaarImage";
import { FlexBetween } from "components/flex-box";

// styled component
const StyledBox = styled(FlexBetween)(({
  theme
}) => ({
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(4),
  ".title": {
    fontSize: 50,
    marginTop: 0,
    lineHeight: 1.2,
    marginBottom: "1.35rem",
    color: theme.palette.text.primary,
    textShadow: "0 8px 20px rgba(2, 6, 23, 0.5)"
  },
  ".subtitle": {
    maxWidth: 520,
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.35,
    marginTop: 0,
    marginBottom: "1.75rem",
    color: theme.palette.grey[100],
    textShadow: "0 10px 24px rgba(2, 6, 23, 0.45)"
  },
  [theme.breakpoints.up("sm")]: {
    ".grid-item": {
      minHeight: 424,
      display: "flex",
      alignItems: "baseline",
      flexDirection: "column",
      justifyContent: "center"
    }
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(3),
    ".subtitle": {
      fontSize: 20,
      marginBottom: "1.25rem"
    }
  },
  [theme.breakpoints.down("sm")]: {
    paddingTop: theme.spacing(3.5),
    paddingBottom: theme.spacing(3),
    ".title": {
      fontSize: 34,
      lineHeight: 1.12,
      marginBottom: "0.85rem"
    },
    ".subtitle": {
      fontSize: 18,
      marginBottom: "1rem"
    },
    ".button-link": {
      height: 36,
      padding: "0 1.5rem",
      fontSize: 13
    }
  }
}));

// ==================================================

// ==================================================

const CarouselCard1 = ({
  title,
  imgUrl,
  buttonLik,
  buttonText,
  description,
  buttonColor = "primary"
}) => {
  return <StyledBox>
      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item className="grid-item" sm={5} xs={12}>
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{description}</h2>

          {buttonText && buttonLik && (
            <a href={buttonLik}>
              <Button size="large" color={buttonColor} disableElevation variant="contained" className="button-link" sx={{
              height: 44,
              borderRadius: "4px"
            }}>
                {buttonText}
              </Button>
            </a>
          )}
        </Grid>

        <Grid item sm={5} xs={12}>
          <BazaarImage src={imgUrl} alt={title} sx={{
          mx: "auto",
          maxHeight: {
            xs: 320,
            sm: 360,
            md: 400
          },
          mt: {
            xs: 1.5,
            sm: 0
          },
          display: "block",
          maxWidth: "100%"
        }} />
        </Grid>
      </Grid>
    </StyledBox>;
};
export default CarouselCard1;
