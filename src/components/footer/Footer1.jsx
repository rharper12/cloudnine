import Link from "next/link";
import { Box, Container, Grid, IconButton } from "@mui/material";
import EmailOutlined from "@mui/icons-material/EmailOutlined";
import PhoneInTalkOutlined from "@mui/icons-material/PhoneInTalkOutlined";
import Image from "components/BazaarImage";
import { Paragraph } from "components/Typography";
import Instagram from "components/icons/Instagram";

const CONTACT = {
  phoneDisplay: "(931) 206-1037",
  phoneHref: "tel:+19312061037",
  email: "Cloud9inflatables@gmail.com",
  instagramHandle: "Cloud9Inflatable",
  instagramUrl: "https://www.instagram.com/Cloud9Inflatable/"
};

const ContactRow = ({ href, ariaLabel, icon: Icon, children, external = false }) => (
  <Box
    component="a"
    href={href}
    target={external ? "_blank" : undefined}
    rel={external ? "noreferrer noopener" : undefined}
    aria-label={ariaLabel}
    sx={{
      py: 0.6,
      color: "grey.200",
      display: "flex",
      alignItems: "center",
      gap: 1,
      textDecoration: "none",
      width: "fit-content",
      "&:focus-visible": {
        outline: "2px solid rgba(255, 193, 7, 0.85)",
        outlineOffset: "3px",
        borderRadius: "10px"
      }
    }}
  >
    <IconButton
      aria-hidden="true"
      tabIndex={-1}
      disableRipple
      sx={{
        p: 1,
        backgroundColor: "rgba(255,255,255,0.08)",
        border: "1px solid rgba(255,255,255,0.18)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        color: "warning.main",
        "&:hover": {
          backgroundColor: "rgba(255,255,255,0.12)"
        }
      }}
    >
      <Icon fontSize="small" />
    </IconButton>

    <Box component="span" sx={{ color: "grey.200", wordBreak: "break-word" }}>
      {children}
    </Box>
  </Box>
);

const Footer1 = () => {
  return (
    <footer>
      <Box
        sx={{
          background: "transparent",
          borderTop: "1px solid rgba(255, 255, 255, 0.2)"
        }}
      >
        <Container
          sx={{
            px: "1rem",
            pt: "1rem",
            pb: { xs: "1rem", sm: "1rem" },
            color: "white"
          }}
        >
          <Box py={5} overflow="hidden">
            <Grid container spacing={3}>
              <Grid item lg={6} md={6} sm={12} xs={12}>
                <Link href="/">
                  <a>
                    <Image mb={2.5} src="/assets/images/logo.svg" alt="Cloud 9 Inflatables" sx={{ maxWidth: 180 }} />
                  </a>
                </Link>

                <Paragraph mb={2.5} color="grey.200">
                  Cloud 9 Inflatables brings clean, safe, and unforgettable fun to every event. Spend less, rent with the best!
                  Choose your rental, add it to the cart, and call us to lock in your date.
                </Paragraph>
              </Grid>

              <Grid item lg={3} md={3} sm={12} xs={12}>
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

              <Grid item lg={3} md={3} sm={12} xs={12}>
                <Box fontSize="18px" fontWeight="600" mb={1.5} lineHeight="1" color="white">
                  Contact
                </Box>

                <ContactRow
                  href={CONTACT.phoneHref}
                  icon={PhoneInTalkOutlined}
                  ariaLabel={`Call Cloud 9 Inflatables at ${CONTACT.phoneDisplay}`}
                >
                  {CONTACT.phoneDisplay}
                </ContactRow>

                <ContactRow
                  href={`mailto:${CONTACT.email}`}
                  icon={EmailOutlined}
                  ariaLabel={`Email Cloud 9 Inflatables at ${CONTACT.email}`}
                >
                  {CONTACT.email}
                </ContactRow>

                <ContactRow
                  href={CONTACT.instagramUrl}
                  external
                  icon={Instagram}
                  ariaLabel={`Visit Cloud 9 Inflatables on Instagram at ${CONTACT.instagramHandle}`}
                >
                  @{CONTACT.instagramHandle}
                </ContactRow>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </footer>
  );
};

export default Footer1;
