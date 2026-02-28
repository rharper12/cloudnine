import { Container, Grid, Box } from "@mui/material";
import appIcons from "components/icons";
import { H2, H4, Paragraph } from "components/Typography";

const steps = [
  {
    title: "Choose Your Inflatable",
    description: "Pick the bounce house or slide that fits your event size and age group.",
    icon: "TeddyBear"
  },
  {
    title: "Reserve Your Date",
    description: "Add it to the cart and call us to confirm availability and pricing.",
    icon: "AlarmClock"
  },
  {
    title: "We Deliver & Set Up",
    description: "Our team handles setup, safety checks, and teardown after the fun.",
    icon: "TruckFast"
  }
];

// ===========================================================

const Section3 = () => {
  return (
    <Container sx={{ mt: 8 }}>
      <H2 textAlign="center" mb={4} color="warning.main">
        How Rentals Work
      </H2>

      <Grid container spacing={3}>
        {steps.map(step => {
          const Icon = appIcons[step.icon] || appIcons.Verify;
          return (
            <Grid item md={4} sm={6} xs={12} key={step.title}>
              <Box
                height="100%"
                p={3}
                bgcolor="rgba(10, 16, 26, 0.58)"
                borderRadius="18px"
                border="1px solid"
                borderColor="rgba(240, 216, 24, 0.42)"
                sx={{ backdropFilter: "blur(6px)" }}
                boxShadow="0 14px 30px rgba(2, 6, 23, 0.45)"
              >
                <Box sx={{
              height: 6,
              width: 48,
              borderRadius: 999,
              background: "linear-gradient(90deg, #F0D818 0%, #1E7BFF 100%)",
              mb: 2
            }} />
                <Icon sx={{ fontSize: 42, color: "warning.main", mb: 1 }} />
                <H4 mb={1} color="warning.main">{step.title}</H4>
                <Paragraph color="grey.200">{step.description}</Paragraph>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default Section3;
