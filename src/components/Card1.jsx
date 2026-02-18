import { Card, styled } from "@mui/material";
const Card1 = styled(Card)(({ theme }) => ({
  position: "relative",
  padding: "1.5rem 1.75rem",
  borderRadius: 18,
  border: "1px solid rgba(30, 123, 255, 0.35)",
  background: "linear-gradient(180deg, rgba(10, 16, 26, 0.72) 0%, rgba(10, 16, 26, 0.6) 100%)",
  backdropFilter: "blur(6px)",
  boxShadow: "0 18px 40px rgba(2, 6, 23, 0.35)",
  ["@media only screen and (max-width: 678px)"]: {
    padding: "1rem"
  }
}));
export default Card1;
