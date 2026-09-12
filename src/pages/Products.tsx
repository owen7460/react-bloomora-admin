import { useState, useEffect } from "react";
import type { Product } from "@/types/products";
import { getProducts } from "@/apis/products";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
        console.log(res);
      } catch (error) {
        console.error("fetch products error", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <>
      <h1 className="text-amber-500 font-bold">Welcome admin -- Bloomora</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.name}</p>
            <p>${product.price}</p>
            <p>{product.description}</p>
            <p>{product.created_at}</p>
            <p>{product.updated_at}</p>
            <hr />
          </div>
        ))}
      </div>
    </>
  );
}
