import { products as inflatables } from "../fashion-2/data";

const productList = [...inflatables];

// get unique products from product list
const uniqueProudcts = [...new Set(productList.map(item => item.slug))].map(item => productList.find(it => it.slug === item));

// get the all slugs
const slugs = uniqueProudcts.map(item => ({
  params: {
    slug: item.slug
  }
}));

// get product names for search
const search = uniqueProudcts.map(item => item.title);

export { uniqueProudcts, slugs, search };
