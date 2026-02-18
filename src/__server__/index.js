import Mock from "./mock";
import "./__db__/fashion-2";
import "./__db__/products";
import "./__db__/related-products";
Mock.onAny().passThrough();
