import { useState, useEffect } from "react";
import type { Product } from "@/types/products";
import { getProducts } from "@/apis/products";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AddProductDialog from "@/components/AddProductDialog";

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
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-bold text-primary">Inventory Products</p>
        <AddProductDialog />
      </div>
      <Table>
        <TableCaption>A list of your products inventory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-primary">
              Product Name
            </TableHead>
            <TableHead className="text-primary">SKU</TableHead>
            <TableHead className="text-primary">Price</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Stock</TableHead>
            {/* <TableHead className="text-right">Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                {product.is_active === 1 ? "Active" : "Inactive"}
              </TableCell>
              <TableCell>{product.stock_quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total</TableCell>
            <TableCell>
              {products.reduce(
                (acc, product) => acc + product.stock_quantity,
                0,
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
