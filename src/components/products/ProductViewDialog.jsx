import { Add, Close, Remove } from "@mui/icons-material";
import { Box, Button, Dialog, DialogContent, Divider, Grid, IconButton, styled } from "@mui/material";
import { FlexBox } from "components/flex-box";
import BazaarImage from "components/BazaarImage";
import Carousel from "components/carousel/Carousel";
import { H1, H2, H3, Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";

// styled components
const ContentWrapper = styled(Box)(({
  theme
}) => ({
  "& .carousel:hover": {
    cursor: "pointer",
    "& .carousel__back-button": {
      opacity: 1
    },
    "& .carousel__next-button": {
      opacity: 1
    }
  },
  "& .carousel__next-button, & .carousel__back-button": {
    opacity: 1,
    transition: "all 0.3s",
    background: "rgba(8, 12, 18, 0.68)",
    backdropFilter: "blur(8px)",
    border: "1px solid rgba(255, 255, 255, 0.32)",
    color: "#FFFFFF",
    width: 44,
    height: 44,
    borderRadius: 999,
    boxShadow: "0 12px 24px rgba(2, 6, 23, 0.25)",
    "& svg": {
      filter: "drop-shadow(0 2px 10px rgba(2, 6, 23, 0.35))"
    },
    ":disabled": {
      opacity: 0.55,
      color: "rgba(255, 255, 255, 0.65)"
    },
    ":hover": {
      background: "rgba(30, 123, 255, 0.55)",
      borderColor: "rgba(255, 255, 255, 0.4)"
    }
  },
  "& .carousel__back-button": { left: 10 },
  "& .carousel__next-button": { right: 10 }
}));

// =====================================================

// =====================================================

const ProductViewDialog = props => {
  const {
    product,
    openDialog,
    handleCloseDialog
  } = props;
  const {
    state,
    dispatch
  } = useAppContext();
  const cartItem = state.cart.find(item => item.id === product.id);
  const maxQty = Number.isFinite(product?.maxQty) && product.maxQty > 0 ? product.maxQty : null;
  const priceLabel = product.priceLabel || (product.price > 0 ? currency(product.price) : "Call for pricing");
  const handleCartAmountChange = amount => () => {
    if (maxQty && amount > maxQty) {
      dispatch({
        type: "CHANGE_CART_AMOUNT",
        payload: {
          ...product,
          qty: maxQty,
          name: product.title,
          imgUrl: product.imgGroup[0]
        }
      });
      return;
    }

    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        qty: amount,
        name: product.title,
        imgUrl: product.imgGroup[0]
      }
    });
  };
  return <Dialog open={openDialog} maxWidth={false} onClose={handleCloseDialog} sx={{
    zIndex: 1501,
    "& .MuiDialog-paper": {
      borderRadius: "18px !important",
      border: "1px solid rgba(30, 123, 255, 0.35)",
      background: "linear-gradient(180deg, rgba(10, 16, 26, 0.72) 0%, rgba(10, 16, 26, 0.6) 100%)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 24px 70px rgba(2, 6, 23, 0.55)",
      overflow: "hidden"
    }
  }}>
      <DialogContent sx={{
      maxWidth: 980,
      width: "100%",
      p: {
        sm: 4,
        xs: 2.5
      },
      background: "transparent"
    }}>
        <ContentWrapper>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Carousel totalSlides={product.imgGroup.length} visibleSlides={1}>
                {product.imgGroup.map((item, index) => <BazaarImage key={index} alt={product.title} src={item} sx={{
                mx: "auto",
                width: "100%",
                objectFit: "contain",
                height: {
                  sm: 400,
                  xs: 250
                }
              }} />)}
              </Carousel>
            </Grid>

            <Grid item md={6} xs={12} alignSelf="center">
              <H2 color="warning.main">{product.title}</H2>

              <Paragraph py={1} color="grey.200" fontWeight={600} fontSize={13}>
                {product.categories?.[0] || "Inflatable Rental"}
              </Paragraph>

              <H1 color="warning.main">{priceLabel}</H1>

              {product.description && (
                <Paragraph my={2} color="grey.200">
                  {product.description}
                </Paragraph>
              )}

              <Divider sx={{
              mb: 2,
              borderColor: "rgba(148, 163, 184, 0.25)"
            }} />

              {!cartItem?.qty ? <Button size="large" color="warning" variant="contained" onClick={handleCartAmountChange(1)} sx={{
              height: 48,
              minWidth: 180,
              fontWeight: 800,
              boxShadow: "0 16px 30px rgba(2, 6, 23, 0.35)",
              ":hover": { boxShadow: "0 18px 36px rgba(2, 6, 23, 0.45)" }
            }}>
                  Add to Cart
                </Button> : <FlexBox alignItems="center">
                  <Button size="small" color="primary" variant="outlined" aria-label="Decrease quantity" sx={{
                p: ".6rem",
                height: 45
              }} onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                    <Remove fontSize="small" />
                  </Button>

                  <H3 fontWeight="600" mx={2.5}>
                    {cartItem?.qty.toString().padStart(2, "0")}
                  </H3>

                  <Button size="small" color="primary" variant="outlined" aria-label="Increase quantity" disabled={!!maxQty && (cartItem?.qty || 0) >= maxQty} sx={{
                p: ".6rem",
                height: 45
              }} onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                    <Add fontSize="small" />
                  </Button>
                </FlexBox>}
            </Grid>
          </Grid>
        </ContentWrapper>

        <IconButton sx={{
        position: "absolute",
        top: 10,
        right: 10,
        background: "rgba(8, 12, 18, 0.35)",
        border: "1px solid rgba(255, 255, 255, 0.18)",
        backdropFilter: "blur(8px)",
        ":hover": { background: "rgba(255, 59, 48, 0.35)" }
      }} aria-label="Close quick view" onClick={handleCloseDialog}>
          <Close fontSize="small" sx={{ color: "#FFFFFF" }} />
        </IconButton>
      </DialogContent>
    </Dialog>;
};
export default ProductViewDialog;
