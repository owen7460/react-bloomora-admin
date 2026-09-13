import http from "@/apis/client";
import type { GetProductsResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
  UpdateProductResponse,
  DeleteProductResponse,
} from "@/types/products";

const getProducts = async (): Promise<GetProductsResponse> => {
  const res = await http.get("/products");
  return res.data;
};

const createProduct = async (payload: CreateProductPayload): Promise<CreateProductResponse> => {
  const res = await http.post("/products", payload);
  return res.data;
};

const updateProduct = async (id: number, payload: UpdateProductPayload): Promise<UpdateProductResponse> => {
  const res = await http.patch(`/products/${id}`, payload);
  return res.data;
};

const deleteProduct = async (id: number): Promise<DeleteProductResponse> => {
  const res = await http.delete(`/products/${id}`);
  return res.data;
};

export { getProducts, createProduct, updateProduct, deleteProduct };
