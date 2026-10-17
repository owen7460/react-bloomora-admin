import { getProducts } from "@/apis/products";
import type { Product } from "@/types/products";
import { useEffect, useState } from "react";

export default function LowStockCard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadProducts = async () => {
      try {
        const allProducts: Product[] = [];
        const pageSize = 100;
        let skip = 0;

        // Read every page so the lowest stock items can come from any page.
        while (!cancelled) {
          const res = await getProducts(skip, pageSize);
          if (cancelled) return;

          allProducts.push(...res.data);
          if (res.data.length < pageSize) break;
          skip += res.data.length;
        }

        if (!cancelled) {
          setProducts(
            allProducts
              .sort((a, b) => a.stock_quantity - b.stock_quantity || a.id - b.id)
              .slice(0, 2),
          );
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load stock levels. Please try again later.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="w-75 bg-gray-100 shadow-2xl p-10 rounded-md transition-all duration-150 ease-in hover:-translate-y-3 hover:scale-105">
      <h2 className="text-primary text-2xl font-bold pb-2">Stock Alert 📦</h2>
      <p className="text-sm text-gray-500 pb-4">2 products with the lowest stock</p>
      {isLoading ? (
        <p className="text-sm text-gray-500">Loading stock levels...</p>
      ) : error ? (
        <p role="alert" className="text-sm text-gray-500">{error}</p>
      ) : products.length > 0 ? (
        <ol className="space-y-4">
          {products.map((product) => (
            <li key={product.id}>
              <h3 className="text-base break-words">{product.name}</h3>
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
              <p className="text-sm font-medium">
                {product.stock_quantity} {product.unit} remaining
              </p>
              <p className="text-sm text-gray-500">
                Alert level: {product.low_stock_threshold} {product.unit}
              </p>
              <p className={`text-sm font-medium ${
                product.stock_quantity <= product.low_stock_threshold
                  ? "text-red-600"
                  : "text-green-700"
              }`}>
                {product.stock_quantity <= 0
                  ? "Out of stock"
                  : product.stock_quantity <= product.low_stock_threshold
                    ? "Low stock"
                    : "Stock OK"}
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-sm text-gray-500">No products at the moment.</p>
      )}
    </div>
  );
}
