export interface Product {
  id: number;
  category_id: number | null;
  name: string;
  sku: string;
  cost_price: number;
  price: number;
  stock_quantity: number;
  low_stock_threshold: number;
  unit: string;
  image_url: string | null;
  description: string | null;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface GetProductsResponse {
  code: number;
  message: string;
  data: Product[];
}