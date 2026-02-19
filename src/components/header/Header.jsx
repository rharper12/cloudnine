import Link from "next/link";
import { Fragment, useState } from "react";
import { Badge, Box, Drawer, styled } from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Clear } from "@mui/icons-material";
import clsx from "clsx";
import Icon from "components/icons";
import { layoutConstant } from "utils/constants";
import { useAppContext } from "contexts/AppContext";
import Image from "components/BazaarImage";
import MiniCart from "components/MiniCart";
import { Paragraph } from "components/Typography";
import MobileMenu from "components/navbar/MobileMenu";
import { FlexBetween, FlexBox } from "components/flex-box";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";

// styled component
export const HeaderWrapper = styled(Box)(({
  theme
}) => ({
  zIndex: 3,
  position: "relative",
  height: layoutConstant.headerHeight,
  transition: "height 250ms ease-in-out",
  background: "rgba(8, 12, 18, 0.55)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight
  }
}));
const StyledContainer = styled(Container)({
  gap: 2,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
});

// ==============================================================

// ==============================================================

const Header = ({
  isFixed,
  className,
  searchInput
}) => {
  const theme = useTheme();
  const {
    state
  } = useAppContext();
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const hasSearch = Boolean(searchInput);
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const downMd = useMediaQuery(theme.breakpoints.down(1150));
  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);
  const toggleSearchBar = () => setSearchBarOpen(!searchBarOpen);

  // LOGIN AND MINICART DRAWER
  const DIALOG_DRAWER = <Fragment>
      <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav} sx={{
      zIndex: 9999,
      "& .MuiDrawer-paper": {
        background: "linear-gradient(180deg, rgba(10, 16, 26, 0.88) 0%, rgba(10, 16, 26, 0.72) 100%)",
        backdropFilter: "blur(12px)",
        borderLeft: "1px solid rgba(255, 255, 255, 0.12)"
      }
    }}>
        <MiniCart toggleSidenav={toggleSidenav} />
      </Drawer>
    </Fragment>;

  // FOR SMALLER DEVICE
  if (downMd) {
    const ICON_STYLE = {
      color: theme.palette.warning.main,
      fontSize: 20
    };
    return <HeaderWrapper className={clsx(className)}>
        <StyledContainer>
          <FlexBetween width="100%">
            {/* LEFT CONTENT - NAVIGATION ICON BUTTON */}
            <Box flex={1}>
              <MobileMenu />
            </Box>

            {/* MIDDLE CONTENT - LOGO */}
            <Link href="/">
              <a>
                <Image height={44} src="/assets/images/bazaar-black-sm.svg" alt="Cloud 9 Inflatables" />
              </a>
            </Link>

            {/* RIGHT CONTENT - LOGIN, CART, SEARCH BUTTON */}
            <FlexBox justifyContent="end" flex={1}>
              {hasSearch && (
                <Box component={IconButton} onClick={toggleSearchBar}>
                  <Icon.Search sx={ICON_STYLE} />
                </Box>
              )}

              <Box component={IconButton} aria-label="Open cart" onClick={toggleSidenav}>
                <Badge badgeContent={state.cart.length} color="warning">
                  <Icon.CartBag sx={ICON_STYLE} />
                </Badge>
              </Box>
            </FlexBox>
          </FlexBetween>

          {/* SEARCH FORM DRAWER */}
          {hasSearch && (
            <Drawer open={searchBarOpen} anchor="top" onClose={toggleSearchBar} sx={{
              zIndex: 9999
            }}>
              <Box sx={{
                width: "auto",
                padding: 2,
                height: "100vh"
              }}>
                <FlexBetween mb={1}>
                  <Paragraph>Search rentals</Paragraph>

                  <IconButton onClick={toggleSearchBar}>
                    <Clear />
                  </IconButton>
                </FlexBetween>

                {/* CATEGORY BASED SEARCH FORM */}
                {searchInput}
              </Box>
            </Drawer>
          )}

          {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
          {DIALOG_DRAWER}
        </StyledContainer>
      </HeaderWrapper>;
  }
  return <HeaderWrapper className={clsx(className)}>
      <StyledContainer>
        {/* LEFT CONTENT - LOGO AND CATEGORY */}
        <FlexBox mr={2} minWidth="170px" alignItems="center">
          <Link href="/">
            <a>
              <Image height={44} src="/assets/images/logo2.svg" alt="Cloud 9 Inflatables" />
            </a>
          </Link>
        </FlexBox>

        {/* SEARCH FORM */}
        {hasSearch && (
          <FlexBox justifyContent="center" flex="1 1 0">
            {searchInput}
          </FlexBox>
        )}

        {/* LOGIN AND CART BUTTON */}
        <FlexBox gap={1.5} alignItems="center">
          <Badge badgeContent={state.cart.length} color="warning">
            <Box p={1.25} bgcolor="rgba(8, 12, 18, 0.35)" border="1px solid" borderColor="rgba(255, 138, 0, 0.45)" component={IconButton} aria-label="Open cart" onClick={toggleSidenav} sx={{ backdropFilter: "blur(10px)" }}>
              <ShoppingBagOutlined sx={{ color: "warning.main" }} />
            </Box>
          </Badge>
        </FlexBox>

        {/* LOGIN FORM DIALOG AND CART SIDE BAR  */}
        {DIALOG_DRAWER}
      </StyledContainer>
    </HeaderWrapper>;
};
export default Header;
