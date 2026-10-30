import { useState, useEffect } from "react";
import type { Product, UpdateProductPayload } from "@/types/products";
import { getProducts, deleteProduct, updateProduct } from "@/apis/products";
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
import ViewProductDialog from "@/components/ViewProductDialog";
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
import { ShimmerMarker } from "@/components/Shimmer";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const reloadProducts = () => setReloadKey((key) => key + 1);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewingProduct, setViewingProduct] = useState<Product | null>(null);

  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);

  const handleDeleteProduct = async (id: number) => {
    try {
      const res = await deleteProduct(id);
      reloadProducts();
      console.log(res);
      notifySuccess(`${res.data.name} deleted successfully`);
    } catch (error) {
      console.error("delete product error", error);
      notifyError("Failed to delete product");
    }
  };

  const handleEditProduct = (editingProduct: Product) => {
    setEditingProduct(editingProduct);
    setEditOpen(true);
  };

  const handleViewProduct = (product: Product) => {
    setViewingProduct(product);
    setViewOpen(true);
  };

  const handleUpdateProduct = async (payload: UpdateProductPayload) => {
    if (!editingProduct) return;
    try {
      await updateProduct(editingProduct.id, payload);
      reloadProducts();
      notifySuccess("Product updated successfully");
    } catch (error) {
      console.error("update product error", error);
      notifyError("Failed to update product");
      throw error;
    }
  };

  const handleProductCreated = async () => {
    reloadProducts();
    notifySuccess("Product added successfully");
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  useEffect(() => {
    let ignore = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);
      setProducts([]);

      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const res = await getProducts(page, pageSize);
        if (res.code !== 200) {
          throw new Error(`fetch products failed: ${res.message}`);
        }
        if (!ignore) {
          setProducts(res.data);
        }
      } catch (error) {
        if (!ignore) {
          setError(error instanceof Error ? error.message : String(error));
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }
    loadProducts();

    return () => {
      ignore = true;
    };
  }, [page, pageSize, reloadKey]);

  if (loading) {
    return <ShimmerMarker />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
            <TableHead className="w-37.5 text-primary">Product Name</TableHead>
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
                    <DropdownMenuItem
                      onClick={() => handleViewProduct(product)}
                    >
                      View
                    </DropdownMenuItem>
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
          key={editingProduct.id}
          open={editOpen}
          onOpenChange={setEditOpen}
          editingProduct={editingProduct}
          onSubmit={handleUpdateProduct}
        />
      )}
      {viewingProduct && (
        <ViewProductDialog
          key={viewingProduct.id}
          open={viewOpen}
          onOpenChange={setViewOpen}
          viewingProduct={viewingProduct}
        />
      )}
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}
