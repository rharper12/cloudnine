import * as db from "./data";
import Mock from "../../mock";

const INTERNAL_ERROR = {
  message: "Internal server error"
};

const reply = (fn) => {
  try {
    return [200, fn()];
  } catch (err) {
    console.error(err);
    return [500, INTERNAL_ERROR];
  }
};

Mock.onGet("/api/rentals/products").reply(() => reply(() => db.products));
Mock.onGet("/api/rentals/services").reply(() => reply(() => db.serviceList));
Mock.onGet("/api/rentals/main-carousel").reply(() => reply(() => db.mainCarouselData));
