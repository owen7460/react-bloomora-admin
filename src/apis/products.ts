import http from "@/apis/client";
import type { GetProductsResponse } from "@/types/products";

const getProducts = async (): Promise<GetProductsResponse> => {
  const res = await http.get("/products");
  return res.data;
};

export { getProducts };
