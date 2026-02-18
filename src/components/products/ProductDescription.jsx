import { Box, Grid } from "@mui/material";
import { H3, Paragraph } from "components/Typography";

// ======================================================

// ======================================================

const ListBlock = ({ title, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <Box mb={3}>
      <H3 mb={1} color="warning.main">{title}</H3>
      {items.map(item => (
        <Paragraph key={item} color="grey.200">
          {item}
        </Paragraph>
      ))}
    </Box>
  );
};

const ProductDescription = ({ product }) => {
  if (!product) return null;
  return (
    <Box>
      {product.description && (
        <Box mb={3}>
          <H3 mb={1} color="warning.main">Overview</H3>
          <Paragraph color="grey.200">{product.description}</Paragraph>
        </Box>
      )}

      <Grid container spacing={4}>
        <Grid item md={6} xs={12}>
          <ListBlock title="Specifications" items={product.specs} />
        </Grid>
        <Grid item md={6} xs={12}>
          <ListBlock title="Rider Requirements" items={product.riderRequirements} />
        </Grid>
      </Grid>

      <ListBlock title="Features" items={product.features} />
    </Box>
  );
};

export default ProductDescription;
