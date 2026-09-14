import http from "@/apis/client";
import type { GetProductsResponse,
  CreateProductPayload,
  CreateProductResponse,
  UpdateProductPayload,
  UpdateProductResponse,
  DeleteProductResponse,
} from "@/types/products";

const getProducts = async (): Promise<GetProductsResponse> => {
  const res = await http.get<GetProductsResponse>("/products");
  return res.data;
};

const createProduct = async (payload: CreateProductPayload): Promise<CreateProductResponse> => {
  const res = await http.post<CreateProductResponse>("/products", payload);
  return res.data;
};

const updateProduct = async (id: number, payload: UpdateProductPayload): Promise<UpdateProductResponse> => {
  const res = await http.patch<UpdateProductResponse>(`/products/${id}`, payload);
  return res.data;
};

const deleteProduct = async (id: number): Promise<DeleteProductResponse> => {
  const res = await http.delete<DeleteProductResponse>(`/products/${id}`);
  return res.data;
};

export { getProducts, createProduct, updateProduct, deleteProduct };
