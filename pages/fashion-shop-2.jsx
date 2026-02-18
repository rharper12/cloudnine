import { Box, useTheme } from "@mui/material";
import SEO from "components/SEO";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Section1 from "pages-sections/fashion-shop-2/Section1";
import Section2 from "pages-sections/fashion-shop-2/Section2";
import Section3 from "pages-sections/fashion-shop-2/Section3";
import Section4 from "pages-sections/fashion-shop-2/Section4";
import api from "utils/__api__/fashion-shop-2";

// =======================================================

// =======================================================

const FashionShop2 = props => {
  const theme = useTheme();
  return <ShopLayout1 topbarBgColor="linear-gradient(90deg, #1E7BFF 0%, #FF3B30 55%, #FF8A00 100%)">
      <SEO title="Bouncy House Rentals" />
      <Box bgcolor="transparent">
        {/* HERO SECTION CAROUSEL */}
        <Section1 carouselData={props.mainCarouselData} />

        {/* SERVICE CARDS */}
        <Section2 serviceList={props.serviceList} />

        {/* HOW IT WORKS */}
        <Section3 />

        {/* RENTAL PRODUCTS */}
        <Section4 products={props.products} />

      </Box>

    </ShopLayout1>;
};
export const getStaticProps = async () => {
  const products = await api.getProducts();
  const serviceList = await api.getServices();
  const mainCarouselData = await api.getMainCarouselData();
  return {
    props: {
      products,
      serviceList,
      mainCarouselData
    }
  };
};
export default FashionShop2;
