import Link from "next/link";
import { Button, Divider, Grid } from "@mui/material";
import SEO from "components/SEO";
import { Span } from "components/Typography";
import { FlexBetween, FlexBox } from "components/flex-box";
import ProductCard7 from "components/product-cards/ProductCard7";
import Card1 from "components/Card1";
import CheckoutNavLayout from "components/layouts/CheckoutNavLayout";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";
const Cart = () => {
  const {
    state
  } = useAppContext();
  const cartList = state.cart;
  const getTotalPrice = () => cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  const hasCallForPrice = cartList.some(item => item.price <= 0);
  const totalLabel = hasCallForPrice ? "Call for pricing" : currency(getTotalPrice());
  return <CheckoutNavLayout>
      <SEO title="Cart" />

      <Grid container spacing={3}>
        {/* CART PRODUCT LIST */}
        <Grid item md={8} xs={12}>
          {cartList.map(item => <ProductCard7 key={item.id} {...item} />)}
        </Grid>

        {/* CHECKOUT FORM */}
        <Grid item md={4} xs={12}>
          <Card1>
            <FlexBetween mb={2}>
              <Span color="grey.200">Total:</Span>

              <Span fontSize={18} fontWeight={600} lineHeight="1">
                {totalLabel}
              </Span>
            </FlexBetween>

            <Divider sx={{
            mb: 2
          }} />

            <Link href="/checkout" passHref legacyBehavior>
              <Button variant="contained" color="warning" fullWidth>
                Send Inquiry
              </Button>
            </Link>
          </Card1>
        </Grid>
      </Grid>
    </CheckoutNavLayout>;
};
export default Cart;
