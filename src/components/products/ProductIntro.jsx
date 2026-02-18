import { useState } from "react";
import { Add, Remove } from "@mui/icons-material";
import { Avatar, Box, Button, Grid } from "@mui/material";
import LazyImage from "components/LazyImage";
import { H1, H2, H3, H6, Paragraph } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import { FlexBox, FlexRowCenter } from "../flex-box";
import { currency } from "lib";

// ================================================================

// ================================================================

const ProductIntro = ({
  product
}) => {
  const {
    id,
    price,
    title,
    images,
    slug,
    thumbnail
  } = product;
  const {
    state,
    dispatch
  } = useAppContext();
  const [selectedImage, setSelectedImage] = useState(0);
  const priceLabel = price > 0 ? currency(price) : product.priceLabel || "Call for pricing";
  const imageList = images?.length ? images : thumbnail ? [thumbnail] : [];
  const selectedSrc = imageList[selectedImage] || imageList[0] || thumbnail;

  // CHECK PRODUCT EXIST OR NOT IN THE CART
  const cartItem = state.cart.find(item => item.id === id);

  // HANDLE SELECT IMAGE
  const handleImageClick = ind => () => setSelectedImage(ind);

  // HANDLE CHANGE CART
  const handleCartAmountChange = amount => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        price,
        qty: amount,
        name: title,
        imgUrl: thumbnail,
        id,
        slug
      }
    });
  };
  return <Box width="100%">
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <Box
            sx={{
              width: "100%",
              maxWidth: 520,
              mx: "auto",
              mb: 5,
              borderRadius: "18px",
              overflow: "hidden",
              background: "linear-gradient(135deg, rgba(30, 123, 255, 0.22), rgba(255, 138, 0, 0.16))",
              border: "1px solid rgba(255, 255, 255, 0.12)"
            }}
          >
            {/* Match Quick View: rectangular media area (not a pill/oval) */}
            <Box sx={{ p: 2 }}>
              {selectedSrc ? (
                <LazyImage
                  alt={title}
                  src={selectedSrc}
                  width={1200}
                  height={900}
                  layout="responsive"
                  objectFit="contain"
                  loading="eager"
                  priority
                  sizes="(max-width: 600px) 100vw, 520px"
                  borderRadius="14px"
                />
              ) : (
                <Box
                  sx={{
                    width: "100%",
                    height: { sm: 420, xs: 260 },
                    bgcolor: "rgba(8, 12, 18, 0.35)",
                    borderRadius: 12
                  }}
                />
              )}
            </Box>
          </Box>

          <FlexBox overflow="auto">
            {imageList.map((url, ind) => <FlexRowCenter key={ind} width={64} height={64} minWidth={64} bgcolor="rgba(8, 12, 18, 0.35)" border="1px solid" borderRadius="12px" ml={ind === 0 ? "auto" : 0} style={{
            cursor: "pointer"
          }} onClick={handleImageClick(ind)} mr={ind === imageList.length - 1 ? "auto" : "10px"} borderColor={selectedImage === ind ? "warning.main" : "rgba(255, 255, 255, 0.16)"}>
                <Avatar src={url} variant="square" sx={{
              height: 40
            }} />
              </FlexRowCenter>)}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <H2 mb={1} color="warning.main">{title}</H2>

          {product.description && (
            <Paragraph color="grey.200" mb={2}>
              {product.description}
            </Paragraph>
          )}

          <Box pt={1} mb={3}>
            <H1 color="warning.main" mb={0.5} lineHeight="1">
              {priceLabel}
            </H1>
            <Box color="inherit">Call to confirm availability and pricing.</Box>
          </Box>

          {product.specs?.length > 0 && (
            <Box mb={3}>
              <H6 mb={1}>Quick Specs</H6>
              {product.specs.map(item => (
                <Paragraph key={item} color="grey.200">
                  {item}
                </Paragraph>
              ))}
            </Box>
          )}

          {!cartItem?.qty ? <Button size="large" color="warning" variant="contained" onClick={handleCartAmountChange(1)} sx={{
          mb: 4.5,
          height: 48,
          minWidth: 180,
          fontWeight: 800,
          boxShadow: "0 16px 30px rgba(2, 6, 23, 0.35)",
          ":hover": { boxShadow: "0 18px 36px rgba(2, 6, 23, 0.45)" }
        }}>
              Add to Cart
            </Button> : <FlexBox alignItems="center" mb={4.5}>
              <Button size="small" aria-label="Decrease quantity" sx={{
            p: ".6rem",
            height: 45
          }} color="primary" variant="outlined" onClick={handleCartAmountChange(cartItem?.qty - 1)}>
                <Remove fontSize="small" />
              </Button>

              <H3 fontWeight="600" mx={2.5}>
                {cartItem?.qty.toString().padStart(2, "0")}
              </H3>

              <Button size="small" aria-label="Increase quantity" sx={{
            p: ".6rem",
            height: 45
          }} color="primary" variant="outlined" onClick={handleCartAmountChange(cartItem?.qty + 1)}>
                <Add fontSize="small" />
              </Button>
            </FlexBox>}

          <FlexBox alignItems="center" mb={2}>
            <Box>Provided by:</Box>
            <H6 ml={1}>Cloud Nine Inflatables</H6>
          </FlexBox>
        </Grid>
      </Grid>
    </Box>;
};
export default ProductIntro;
