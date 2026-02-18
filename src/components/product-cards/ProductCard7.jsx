import Link from "next/link";
import { Add, Close, Remove } from "@mui/icons-material";
import { Button, Card, IconButton, styled } from "@mui/material";
import Image from "components/BazaarImage";
import { Span } from "components/Typography";
import { FlexBox } from "components/flex-box";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";

// styled components
const Wrapper = styled(Card)(({
  theme
}) => ({
  display: "flex",
  overflow: "hidden",
  alignItems: "center",
  position: "relative",
  borderRadius: 18,
  marginBottom: "1.5rem",
  border: "1px solid rgba(30, 123, 255, 0.35)",
  background: "linear-gradient(180deg, rgba(10, 16, 26, 0.72) 0%, rgba(10, 16, 26, 0.6) 100%)",
  backdropFilter: "blur(10px)",
  boxShadow: "0 18px 45px rgba(2, 6, 23, 0.45)",
  "@media only screen and (max-width: 425px)": {
    flexWrap: "wrap",
    img: {
      height: "auto",
      minWidth: "100%"
    }
  }
}));

// =========================================================

// =========================================================

const ProductCard7 = ({
  id,
  name,
  qty,
  price,
  imgUrl,
  slug
}) => {
  const {
    dispatch
  } = useAppContext();
  const priceLabel = price > 0 ? currency(price) : "Call for pricing";
  const lineTotalLabel = price > 0 ? currency(price * qty) : "Call for pricing";
  // handle change cart
  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        id,
        name,
        price,
        imgUrl,
        qty: amount,
        slug
      }
    });
  };
  return <Wrapper>
      <Image alt={name} width={140} height={140} display="block" src={imgUrl || "/assets/images/products/iphone-xi.png"} />

      <IconButton size="small" aria-label={`Remove ${name} from cart`} onClick={handleCartAmountChange(0)} sx={{
      position: "absolute",
      right: 15,
      top: 15,
      color: "rgba(248, 250, 252, 0.9)",
      backgroundColor: "rgba(8, 12, 18, 0.35)",
      border: "1px solid rgba(255, 255, 255, 0.12)",
      backdropFilter: "blur(8px)",
      ":hover": { backgroundColor: "rgba(255, 59, 48, 0.25)" }
    }}>
        <Close fontSize="small" />
      </IconButton>

      <FlexBox p={2} rowGap={2} width="100%" flexDirection="column">
        <Link href={`/product/${slug}`}>
          <a>
            <Span ellipsis fontWeight="600" fontSize={18} color="warning.main">
              {name}
            </Span>
          </a>
        </Link>

        <FlexBox gap={1} flexWrap="wrap" alignItems="center">
          <Span color="grey.200">
            {priceLabel} x {qty}
          </Span>

          <Span fontWeight={600} color="warning.main">
            {lineTotalLabel}
          </Span>
        </FlexBox>

        <FlexBox alignItems="center">
          <Button color="warning" aria-label={`Decrease quantity of ${name}`} sx={{
          p: "5px"
        }} variant="outlined" disabled={qty === 1} onClick={handleCartAmountChange(qty - 1)}>
            <Remove fontSize="small" />
          </Button>

          <Span mx={1} fontWeight={600} fontSize={15}>
            {qty}
          </Span>
          <Button color="warning" aria-label={`Increase quantity of ${name}`} sx={{
          p: "5px"
        }} variant="outlined" onClick={handleCartAmountChange(qty + 1)}>
            <Add fontSize="small" />
          </Button>
        </FlexBox>
      </FlexBox>
    </Wrapper>;
};
export default ProductCard7;
