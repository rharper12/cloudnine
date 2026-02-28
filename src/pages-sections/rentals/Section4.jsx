import { Container, Grid, Box } from "@mui/material";
import { H2 } from "components/Typography";
import ProductCard18 from "components/product-cards/ProductCard18";
// ======================================================================

const Section4 = ({
  products
}) => {
  return <Container id="rentals" sx={{
    mt: 8,
    mb: 0,
    pt: 2,
    pb: 4
  }}>
      <H2 textAlign="center" mb={4} color="warning.main">
        Inflatable Rentals
      </H2>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {products.map(product => (
          <Grid item md={4} sm={6} xs={12} key={product.id} display="flex" justifyContent="center">
            <Box sx={{ width: "100%", maxWidth: 360 }}>
              <ProductCard18 product={product} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>;
};
export default Section4;
