import { useState, useEffect } from "react";
import type { Product } from "@/types/products";
import { getProducts, deleteProduct } from "@/apis/products";
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
import EditProductDialog from "@/components/EditProductDialog";
import { notifySuccess, notifyError } from "@/lib/toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontalIcon } from "lucide-react";
import PaginationComponent from "@/components/Pagination";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const loadProducts = async (skip: number = 0, limit: number = 25) => {
    try {
      const res = await getProducts(skip, limit);
      setProducts(res.data);
      console.log(res);
    } catch (error) {
      console.error("fetch products error", error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const res = await deleteProduct(id);
      await loadProducts();
      console.log(res);
      notifySuccess(`${res.data.name} deleted successfully`);
    } catch (error) {
      console.error("delete product error", error);
      notifyError("Failed to delete product");
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setEditOpen(true);
  };

  const handleProductUpdated = async () => {
    await loadProducts();
    notifySuccess("Product updated successfully");
  };

  const handleProductCreated = async () => {
    await loadProducts();
    notifySuccess("Product added successfully");
  };

  const handlePageChange = async (skip: number, limit: number) => {
    await loadProducts(skip, limit);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <p className="text-2xl font-bold text-primary">Inventory Products</p>
        <AddProductDialog onProductCreated={handleProductCreated} />
      </div>
      <Table>
        <TableCaption>A list of your products inventory.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary">#</TableHead>
            <TableHead className="w-[150px] text-primary">
              Product Name
            </TableHead>
            <TableHead className="text-primary">SKU</TableHead>
            <TableHead className="text-primary">Price</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={product.id}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                {product.is_active === 1 ? "Active" : "Inactive"}
              </TableCell>
              <TableCell>{product.stock_quantity}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button variant="ghost" size="icon" className="size-8">
                        <MoreHorizontalIcon />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    }
                  />
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleEditProduct(product)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>View</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5}>Total</TableCell>
            <TableCell>
              {products.reduce(
                (acc, product) => acc + product.stock_quantity,
                0,
              )}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {editingProduct && (
        <EditProductDialog
          open={editOpen}
          onOpenChange={setEditOpen}
          product={editingProduct}
          onProductUpdated={handleProductUpdated}
        />
      )}
      <PaginationComponent
        onPageChange={(skip: number, limit: number) =>
          handlePageChange(skip, limit)
        }
      />
    </>
  );
}
