import { useState, useEffect } from "react";
import type { Product } from "@/types/products";
import { getProducts } from "@/apis/getProducts";
function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
        console.log(res.data);
      } catch (error) {
        console.error("fetch products error", error);
      }
    };
    loadProducts();
  }, []);

  return (
    <>
      <h1>Welcome admin -- Bloomora</h1>
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

export default App;
