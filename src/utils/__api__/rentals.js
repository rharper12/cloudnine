import axios from "axios";

const getProducts = async () => {
  const response = await axios.get("/api/rentals/products");
  return response.data;
};

const getServices = async () => {
  const response = await axios.get("/api/rentals/services");
  return response.data;
};

const getMainCarouselData = async () => {
  const response = await axios.get("/api/rentals/main-carousel");
  return response.data;
};

export default {
  getProducts,
  getServices,
  getMainCarouselData
};
