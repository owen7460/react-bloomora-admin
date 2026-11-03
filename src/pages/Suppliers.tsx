import { useState, useEffect } from "react";
import type { Supplier } from "@/types/suppliers";
import { getSuppliers } from "@/apis/suppliers";
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
import AddSupplierDialog from "@/components/AddSupplierDialog";
// import EditProductDialog from "@/components/EditProductDialog";
// import ViewProductDialog from "@/components/ViewProductDialog";
import { notifySuccess, notifyError } from "@/lib/toast";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { MoreHorizontalIcon } from "lucide-react";
import PaginationComponent from "@/components/Pagination";
import { ShimmerMarker } from "@/components/Shimmer";

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(25);
  const [reloadKey, setReloadKey] = useState<number>(0);

  const reloadSuppliers = () => setReloadKey((key) => key + 1);

  // const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  // const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null);

  // const [editOpen, setEditOpen] = useState<boolean>(false);
  // const [viewOpen, setViewOpen] = useState<boolean>(false);

  // const handleDeleteProduct = async (id: number) => {
  //   try {
  //     const res = await deleteProduct(id);
  //     reloadProducts();
  //     console.log(res);
  //     notifySuccess(`${res.data.name} deleted successfully`);
  //   } catch (error) {
  //     console.error("delete product error", error);
  //     notifyError("Failed to delete product");
  //   }
  // };

  // const handleEditProduct = (editingProduct: Product) => {
  //   setEditingProduct(editingProduct);
  //   setEditOpen(true);
  // };

  // const handleViewProduct = (product: Product) => {
  //   setViewingProduct(product);
  //   setViewOpen(true);
  // };

  // const handleUpdateProduct = async (payload: UpdateProductPayload) => {
  //   if (!editingProduct) return;
  //   try {
  //     await updateProduct(editingProduct.id, payload);
  //     reloadProducts();
  //     notifySuccess("Product updated successfully");
  //   } catch (error) {
  //     console.error("update product error", error);
  //     notifyError("Failed to update product");
  //     throw error;
  //   }
  // };

  const handleSupplierCreated = async () => {
    reloadSuppliers();
    notifySuccess("Supplier added successfully");
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
  };

  const handleSupplierClick = (supplier: Supplier) => {
    console.log(supplier);
  };

  useEffect(() => {
    let ignore = false;

    async function loadSuppliers() {
      setLoading(true);
      setError(null);
      setSuppliers([]);

      try {
        const res = await getSuppliers(page, pageSize);
        if (res.code !== 200) {
          throw new Error(`fetch suppliers failed: ${res.message}`);
        }
        if (!ignore) {
          setSuppliers(res.data);
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
    loadSuppliers();

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
        <p className="text-2xl font-bold text-primary">Suppliers</p>
        <AddSupplierDialog onSupplierCreated={handleSupplierCreated} />
      </div>
      <Table>
        <TableCaption>A list of your suppliers.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="text-primary">#</TableHead>
            <TableHead className="w-37.5 text-primary">Supplier Name</TableHead>
            <TableHead className="text-primary">Email</TableHead>
            <TableHead className="text-primary">Phone</TableHead>
            <TableHead className="text-primary">Contact Name</TableHead>
            <TableHead className="text-primary">Status</TableHead>
            <TableHead className="text-primary">Note</TableHead>
            <TableHead className="text-primary">Created At</TableHead>
            <TableHead className="text-primary">Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {suppliers.map((supplier, index) => (
            <TableRow
              key={supplier.id}
              onClick={() => handleSupplierClick(supplier)}
            >
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{supplier.name}</TableCell>
              <TableCell>{supplier.email}</TableCell>
              <TableCell>{supplier.phone}</TableCell>
              <TableCell>{supplier.contact_name}</TableCell>
              <TableCell>
                {supplier.is_active ? "Active" : "Inactive"}
              </TableCell>
              <TableCell className="max-w-64 truncate">
                {supplier.note}
              </TableCell>
              <TableCell>
                {new Date(supplier.created_at).toLocaleDateString("en-ca")}
              </TableCell>
              <TableCell>
                {new Date(supplier.updated_at).toLocaleDateString("en-ca")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={0}>Total:</TableCell>
            <TableCell>{suppliers.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <PaginationComponent
        page={page}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </>
  );
}
