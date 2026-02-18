import Link from "next/link";
import { Box, Container, Grid } from "@mui/material";
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";

const Footer1 = () => {
  return (
    <footer>
      <Box
        sx={{
          background: "transparent",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <Container sx={{ p: "1rem", color: "white" }}>
          <Box py={5} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={7} md={7} sm={12} xs={12}>
                <Link href="/">
                  <a>
                    <Image mb={2.5} src="/assets/images/logo.svg" alt="Cloud Nine Inflatables" sx={{ maxWidth: 180 }} />
                  </a>
                </Link>

                <Paragraph mb={2.5} color="grey.200">
                  Cloud Nine Inflatables brings clean, safe, and unforgettable fun to every event.
                  Choose your rental, add it to the cart, and call us to lock in your date.
                </Paragraph>
              </Grid>

              <Grid item lg={5} md={5} sm={12} xs={12}>
                <Box fontSize="18px" fontWeight="600" mb={1.5} lineHeight="1" color="white">
                  Booking Notes
                </Box>

                <Box py={0.6} color="grey.200">
                  Call for availability and pricing.
                </Box>
                <Box py={0.6} color="grey.200">
                  Delivery and setup included with every rental.
                </Box>
                <Box py={0.6} color="grey.200">
                  Safety checks performed before every event.
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer1;
