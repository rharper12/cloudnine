import { useRouter } from "next/router";
import { Box, Container } from "@mui/material";
import { H2 } from "components/Typography";
import ShopLayout1 from "components/layouts/ShopLayout1";
import Card1 from "components/Card1";
import ProductIntro from "components/products/ProductIntro";
import ProductDescription from "components/products/ProductDescription";
import api from "utils/__api__/products";

// ===============================================================

// ===============================================================

const ProductDetails = props => {
  const { product } = props;
  const router = useRouter();

  // Show a loading state when the fallback is rendered
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return <ShopLayout1 topbarBgColor="linear-gradient(90deg, #1E7BFF 0%, #FF3B30 55%, #FF8A00 100%)">
      <Container sx={{
      my: 4
    }}>
        {/* PRODUCT DETAILS INFO AREA */}
        {product ? <Card1 sx={{ mb: 4 }}><ProductIntro product={product} /></Card1> : <H2>Loading...</H2>}

        {/* PRODUCT DESCRIPTION */}
        <Card1 sx={{ mb: 6 }}>
          <Box>
            <ProductDescription product={product} />
          </Box>
        </Card1>
      </Container>
    </ShopLayout1>;
};
export const getStaticPaths = async () => {
  const paths = await api.getSlugs();
  return {
    paths: paths,
    //indicates that no page needs be created at build time
    fallback: "blocking" //indicates the type of fallback
  };
};

export const getStaticProps = async ({
  params
}) => {
  try {
    const product = await api.getProduct(params?.slug);
    if (!product) {
      return { notFound: true, revalidate: 60 };
    }

    return {
      props: {
        product
      },
      revalidate: 60
    };
  } catch (error) {
    return { notFound: true, revalidate: 60 };
  }
};
export default ProductDetails;
