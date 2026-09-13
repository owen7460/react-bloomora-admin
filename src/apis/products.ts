import http from "@/apis/client";
import type { GetProductsResponse,CreateProductPayload,CreateProductResponse } from "@/types/products";

const getProducts = async (): Promise<GetProductsResponse> => {
  const res = await http.get("/products");
  return res.data;
};

const createProduct = async (payload: CreateProductPayload): Promise<CreateProductResponse> => {
  const res = await http.post("/products", payload);
  return res.data;
};

export { getProducts, createProduct };
