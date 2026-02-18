import Link from "next/link";
import { Avatar, Box, Button, Divider, IconButton, useTheme } from "@mui/material";
import { Add, Clear, Close, Remove } from "@mui/icons-material";
import LazyImage from "components/LazyImage";
import { FlexBetween, FlexBox } from "components/flex-box";
import { H5, Paragraph, Tiny } from "components/Typography";
import CartBag from "components/icons/CartBag";
import { useAppContext } from "contexts/AppContext";
import { currency } from "lib";

// =========================================================

// =========================================================

const MiniCart = ({
  toggleSidenav
}) => {
  const {
    palette
  } = useTheme();
  const {
    state,
    dispatch
  } = useAppContext();
  const cartList = state.cart;
  const handleCartAmountChange = (amount, product) => () => {
    dispatch({
      type: "CHANGE_CART_AMOUNT",
      payload: {
        ...product,
        qty: amount
      }
    });
  };
  const getTotalPrice = () => {
    return cartList.reduce((accum, item) => accum + item.price * item.qty, 0);
  };
  return <Box width="100%" maxWidth={380}>
      <Box overflow="auto" height={`calc(100vh - ${!!cartList.length ? "80px - 3.25rem" : "0px"})`}>
        <FlexBetween mx={3} height={74}>
          <FlexBox gap={1} alignItems="center" color="warning.main">
            <CartBag color="inherit" />

            <Paragraph lineHeight={0} fontWeight={600}>
              {cartList.length} item
            </Paragraph>
          </FlexBox>

          <IconButton aria-label="Close cart" onClick={toggleSidenav} sx={{ color: "text.primary" }}>
            <Clear />
          </IconButton>
        </FlexBetween>

        <Divider />

        {cartList.length <= 0 && <FlexBox alignItems="center" flexDirection="column" justifyContent="center" height="calc(100% - 74px)">
            <LazyImage width={90} height={100} alt="banner" src="/assets/images/logos/shopping-bag.svg" />
            <Box component="p" mt={2} color="grey.200" textAlign="center" maxWidth="240px">
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexBox>}

        {cartList.map(item => <FlexBox py={2} px={2.5} key={item.id} alignItems="center" borderBottom={`1px solid ${palette.divider}`}>
            <FlexBox alignItems="center" flexDirection="column">
              <Button color="warning" variant="outlined" onClick={handleCartAmountChange(item.qty + 1, item)} sx={{
            height: 40,
            width: 40,
            minWidth: 40,
            borderRadius: "999px"
          }}>
                <Add fontSize="small" />
              </Button>

              <Box fontWeight={600} fontSize="15px" my="3px">
                {item.qty}
              </Box>

              <Button color="warning" variant="outlined" disabled={item.qty === 1} onClick={handleCartAmountChange(item.qty - 1, item)} sx={{
            height: 40,
            width: 40,
            minWidth: 40,
            borderRadius: "999px"
          }}>
                <Remove fontSize="small" />
              </Button>
            </FlexBox>

            <Link href={`/product/${item.id}`}>
              <a>
                <Avatar alt={item.name} src={item.imgUrl} sx={{
              mx: 2,
              width: 76,
              height: 76
            }} />
              </a>
            </Link>

            <Box flex="1" sx={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }}>
              <Link href={`/product/${item.slug}`}>
                <a>
                  <H5 ellipsis fontSize="14px" className="title" color="warning.main">
                    {item.name}
                  </H5>
                </a>
              </Link>

              <Tiny color="grey.200">
                {currency(item.price)} x {item.qty}
              </Tiny>

              <Box fontWeight={700} fontSize="14px" color="warning.main" mt={0.5}>
                {currency(item.qty * item.price)}
              </Box>
            </Box>

            <IconButton size="small" onClick={handleCartAmountChange(0, item)} sx={{
          marginLeft: 2.5,
          color: "text.primary"
        }}>
              <Close fontSize="small" />
            </IconButton>
          </FlexBox>)}
      </Box>

      {cartList.length > 0 && <Box p={2.5}>
          <Link href="/checkout" passHref>
            <Button fullWidth color="warning" variant="contained" sx={{
          mb: "0.75rem",
          height: "40px"
        }} onClick={toggleSidenav}>
              Send Inquiry
            </Button>
          </Link>
        </Box>}
    </Box>;
};
export default MiniCart;
