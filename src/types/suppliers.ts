export interface Supplier {
  id: number;
  name: string;
  email: string;
  phone: string;
  contact_name: string;
  is_active: boolean;
  note: string;
  created_at: string;
  updated_at: string;
}

export interface GetSupplierResponse {
  code: number;
  message: string;
  data: Supplier;
}

export interface GetSuppliersResponse {
  code: number;
  message: string;
  data: Supplier[];
}

export interface CreateSupplierPayload {
  name: string;
  email: string;
  phone: string;
  contact_name: string;
  is_active: boolean;
  note: string;
}

export interface CreateSupplierResponse {
  code: number;
  message: string;
  data: Supplier;
}
