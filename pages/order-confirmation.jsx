import Link from "next/link";
import { Button, Container, styled } from "@mui/material";
import SEO from "components/SEO";
import LazyImage from "components/LazyImage";
import Card1 from "components/Card1";
import { H1, Paragraph } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";

// custom styled components
const Wrapper = styled(Card1)({
  margin: "auto",
  padding: "3rem",
  maxWidth: "630px",
  textAlign: "center"
});
const StyledButton = styled(Button)({
  marginTop: "2rem",
  padding: "11px 24px"
});
const OrderConfirmation = () => {
  return <ShopLayout1>
      <SEO title="Rental Request" />

      <Container sx={{
      mt: 4,
      mb: 20
    }}>
        <Wrapper>
          <LazyImage width={116} height={116} alt="complete" src="/assets/images/illustrations/party-popper.svg" />
          <H1 lineHeight={1.1} mt="1.5rem">
            Your rental request is in!
          </H1>

          <Paragraph color="grey.200" mt="0.3rem">
            We will follow up to confirm availability and pricing.
          </Paragraph>

          <Link href="/#rentals" passHref>
            <StyledButton color="warning" disableElevation variant="contained" className="button-link">
              Browse rentals
            </StyledButton>
          </Link>
        </Wrapper>
      </Container>
    </ShopLayout1>;
};
export default OrderConfirmation;
