import { Badge } from "@mui/material";
import Home from "components/icons/Home";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import { useAppContext } from "contexts/AppContext";
import { iconStyle, StyledNavLink, Wrapper } from "./styles";

const MobileNavigationBar = () => {
  const {
    state
  } = useAppContext();
  // Always render and let CSS media queries handle visibility.
  // This avoids SSR hydration mismatches caused by reading window size.
  return <Wrapper>
      {list.map(item => <StyledNavLink href={item.href} key={item.title}>
          {item.title === "Cart" ? <Badge badgeContent={state.cart.length} color="primary">
              <item.icon fontSize="small" sx={iconStyle} />
            </Badge> : <item.icon sx={iconStyle} fontSize="small" />}

          {item.title}
        </StyledNavLink>)}
    </Wrapper>;
};
const list = [{
  title: "Home",
  icon: Home,
  href: "/"
}, {
  title: "Cart",
  icon: ShoppingBagOutlined,
  href: "/cart"
}];
export default MobileNavigationBar;
