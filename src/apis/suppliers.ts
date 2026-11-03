import http from "@/apis/client";
import type {
  GetSuppliersResponse,
  GetSupplierResponse,
  CreateSupplierPayload,
  CreateSupplierResponse,
} from "@/types/suppliers";

export const getSupplier = async (id: number): Promise<GetSupplierResponse> => {
  const res = await http.get<GetSupplierResponse>(`/suppliers/${id}`);
  return res.data;
};

export const getSuppliers = async (
  page: number = 1,
  pageSize: number = 25,
): Promise<GetSuppliersResponse> => {
  const res = await http.get<GetSuppliersResponse>(
    `/suppliers?page=${page}&pageSize=${pageSize}`,
  );
  return res.data;
};

export const createSupplier = async (
  payload: CreateSupplierPayload,
): Promise<CreateSupplierResponse> => {
  const res = await http.post<CreateSupplierResponse>("/suppliers", payload);
  return res.data;
};
