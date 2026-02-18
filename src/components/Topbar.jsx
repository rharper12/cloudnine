import { Box, Chip, Container, styled } from "@mui/material";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import { layoutConstant } from "utils/constants";

// styled component
const TopbarWrapper = styled(Box, {
  shouldForwardProp: props => props !== "bgColor"
})(({ theme, bgColor }) => ({
  fontSize: 12,
  height: layoutConstant.topbarHeight,
  color: "#FFFFFF",
  background: bgColor || theme.palette.grey[900],
  "& .title": {
    fontWeight: 600
  },
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    padding: "0.5rem 0"
  }
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6
  }
}));

const Topbar = ({ bgColor }) => {
  return (
    <TopbarWrapper
      bgColor={
        bgColor ||
        "linear-gradient(90deg, #0B3C8A 0%, #2459C5 55%, #FFB300 100%)"
      }
    >
      <StyledContainer>
        <FlexBetween width="100%" flexWrap="wrap">
          <FlexBox alignItems="center" gap={1}>
            <Chip
              label="NOW BOOKING"
              size="small"
              sx={{
                color: "#FFFFFF",
                fontWeight: 700,
                backgroundColor: "success.main",
                "& .MuiChip-label": {
                  pl: ".8rem",
                  pr: ".8rem"
                }
              }}
            />
            <Span className="title">Delivery & setup available. Call for pricing.</Span>
          </FlexBox>

          <Span className="title">Cleaned & inspected before every event.</Span>
        </FlexBetween>
      </StyledContainer>
    </TopbarWrapper>
  );
};

export default Topbar;
