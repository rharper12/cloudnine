import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Box, Button, Chip, IconButton, styled } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { currency } from "lib";
import { H4, Paragraph, Small } from "components/Typography";
import { useAppContext } from "contexts/AppContext";
import ProductViewDialog from "components/products/ProductViewDialog";
import { useSnackbar } from "notistack";

// custom styled components
const Card = styled(Box)(({
  theme
}) => ({
  borderRadius: 18,
  border: "1px solid rgba(30, 123, 255, 0.35)",
  background: "linear-gradient(180deg, rgba(10, 16, 26, 0.6) 0%, rgba(10, 16, 26, 0.5) 100%)",
  backdropFilter: "blur(6px)",
  overflow: "hidden",
  ":hover": {
    "& .product-actions": {
      right: 10
    },
    "& img": {
      transform: "scale(1.1)"
    },
    "& .product-view-action": {
      opacity: 1
    }
  }
}));
const CardMedia = styled(Box)(({
  theme
}) => ({
  maxHeight: 300,
  cursor: "pointer",
  overflow: "hidden",
  position: "relative",
  background: "linear-gradient(135deg, rgba(30, 123, 255, 0.22), rgba(255, 138, 0, 0.16))",
  "& img": {
    transition: "0.3s"
  }
}));
const AddToCartButton = styled(IconButton)(({
  theme
}) => ({
  top: 10,
  right: 10,
  position: "absolute",
  transition: "right 0.3s .1s",
  background: theme.palette.warning.main,
  color: theme.palette.warning.contrastText,
  border: "1px solid rgba(255, 255, 255, 0.22)",
  backdropFilter: "blur(8px)",
  width: 36,
  height: 36,
  boxShadow: "0 10px 20px rgba(2, 6, 23, 0.45)",
  ":hover": {
    background: theme.palette.warning.dark || theme.palette.warning.main
  }
}));
const QuickViewButton = styled(Button)(({
  theme
}) => ({
  left: 0,
  bottom: 0,
  opacity: 0,
  borderRadius: 12,
  position: "absolute",
  transition: "all 0.3s",
  margin: 8,
  width: "calc(100% - 16px)"
}));

// ==============================================================

// ==============================================================

const ProductCard18 = ({
  product
}) => {
  const {
    enqueueSnackbar
  } = useSnackbar();
  const {
    state,
    dispatch
  } = useAppContext();
  const [openDialog, setOpenDialog] = useState(false);
  const cartItem = state.cart.find(item => item.slug === product.slug);

  // handle add to cart
  const handleAddToCart = product => () => {
    const payload = {
      id: product.id,
      slug: product.slug,
      name: product.title,
      price: product.price,
      imgUrl: product.thumbnail,
      qty: (cartItem?.qty || 0) + 1
    };
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload
    });
    enqueueSnackbar("Added to Cart", {
      variant: "success"
    });
  };
  const priceLabel = product.price > 0 ? currency(product.price) : product.priceLabel || "Call for pricing";
  return <Card>
      <CardMedia>
        <Link href={`/product/${product.slug}`}>
          <a>
            <Image
              width={300}
              height={300}
              alt={product.title}
              objectFit="cover"
              layout="responsive"
              className="product-img"
              src={product.thumbnail}
            />
          </a>
        </Link>

        <AddToCartButton className="product-actions" aria-label={`Add ${product.title} to cart`} onClick={handleAddToCart(product)}>
          <AddShoppingCart fontSize="small" />
        </AddToCartButton>

        <QuickViewButton fullWidth size="large" color="warning" variant="contained" className="product-view-action" onClick={() => setOpenDialog(true)} aria-label={`Quick view ${product.title}`}>
          Quick View
        </QuickViewButton>
      </CardMedia>

      <ProductViewDialog openDialog={openDialog} handleCloseDialog={() => setOpenDialog(false)} product={{
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      imgGroup: product.images,
      priceLabel: product.priceLabel,
      description: product.description,
      categories: product.categories
    }} />

      <Box p={2} pt={2.5} textAlign="center">
        {product.categories.length > 0 && (
          <Chip
            size="small"
            color="warning"
            label={product.categories[0]}
            sx={{ mb: 1 }}
          />
        )}
        <Paragraph fontWeight="bold" color="warning.main">{product.title}</Paragraph>
        <H4 fontWeight={700} py={0.5} color="grey.100">
          {priceLabel}
        </H4>
      </Box>
    </Card>;
};
export default ProductCard18;
