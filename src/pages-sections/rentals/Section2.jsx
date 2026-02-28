import { Box, Container, styled } from "@mui/material";
import appIcons from "components/icons";
import { H4, Span } from "components/Typography";
import { FlexRowCenter } from "components/flex-box";
// custom styled components
const StyledFlexBox = styled(Box)(({
  theme
}) => ({
  display: "grid",
  padding: "2.5rem 2.75rem",
  boxShadow: "0 18px 45px rgba(0, 36, 90, 0.12)",
  gridTemplateColumns: "repeat(3, 1fr)",
  columnGap: 32,
  rowGap: 16,
  background: "linear-gradient(135deg, rgba(10, 16, 26, 0.55) 0%, rgba(10, 16, 26, 0.48) 100%)",
  backdropFilter: "blur(6px)",
  border: "1px solid rgba(30, 123, 255, 0.28)",
  "& .service-item": {
    paddingLeft: 20,
    paddingRight: 20
  },
  "& .service-item:not(:last-of-type)": {
    borderRight: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.12)" : theme.palette.grey[400]}`
  },
  [theme.breakpoints.down("md")]: {
    gap: 30,
    gridTemplateColumns: "repeat(2, 1fr)"
  },
  [theme.breakpoints.down("sm")]: {
    gap: 20,
    paddingLeft: "1.25rem",
    paddingRight: "1.25rem",
    gridTemplateColumns: "1fr"
  }
}));
const ServiceItem = styled(FlexRowCenter)(({
  theme
}) => ({
  alignItems: "center",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    ":nth-of-type(even)": {
      borderRight: 0
    }
  },
  [theme.breakpoints.down("sm")]: {
    borderRight: 0,
    justifyContent: "flex-start"
  }
}));

// ===========================================================

// ===========================================================

const Section2 = ({
  serviceList
}) => {
  return <Container sx={{
    mt: 8
  }}>
      <StyledFlexBox>
        {serviceList.map((item, ind) => {
        const Icon = appIcons[item.icon];
          return <ServiceItem className="service-item" flexGrow={1} gap={2.5} key={ind}>
              <Box sx={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 0,
            background: "linear-gradient(135deg, rgba(240, 216, 24, 0.34), rgba(30, 123, 255, 0.16))",
            border: "1px solid rgba(240, 216, 24, 0.75)"
          }}>
                <Icon sx={{
              fontSize: 30,
              color: "warning.main",
              display: "block"
            }} />
              </Box>
              <Box>
                <H4 lineHeight={1.3} color="warning.main">{item.title}</H4>
                <Span color="grey.200">{item.description}</Span>
              </Box>
            </ServiceItem>;
      })}
      </StyledFlexBox>
    </Container>;
};
export default Section2;
