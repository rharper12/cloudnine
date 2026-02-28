import Mock from "./mock";
import "./__db__/rentals";
import "./__db__/products";
Mock.onAny().passThrough();
