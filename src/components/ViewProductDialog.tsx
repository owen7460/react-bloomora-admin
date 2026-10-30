import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types/products";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  viewingProduct: Product;
};

export default function ViewProductDialog({
  open,
  onOpenChange,
  viewingProduct,
}: Props) {
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-2xl font-bold">
            View Product
          </DialogTitle>
          <DialogDescription>View the product details.</DialogDescription>
        </DialogHeader>
        <FieldGroup className="mt-4 mb-6">
          <Field>
            <Label htmlFor="product-name">Product Name</Label>
            {viewingProduct?.name}
          </Field>
          <Field>
            <Label htmlFor="sku">Product SKU</Label>
            {viewingProduct?.sku}
          </Field>
          <Field>
            <Label htmlFor="description">Description</Label>
            {viewingProduct?.description}
          </Field>
          <Field>
            <Label htmlFor="category-id">Category</Label>
            {viewingProduct?.category_id ? viewingProduct.category_id : "N/A"}
          </Field>
          <Field>
            <Label htmlFor="price">Price</Label>
            {`$${viewingProduct?.price}`}
          </Field>
          <Field>
            <Label htmlFor="cost-price">Cost Price</Label>
            {`$${viewingProduct?.cost_price}`}
          </Field>
          <Field>
            <Label htmlFor="stock-quantity">Stock Quantity</Label>
            {viewingProduct?.stock_quantity}
          </Field>
          <Field>
            <Label htmlFor="low-stock-threshold">Low Stock Threshold</Label>
            {viewingProduct?.low_stock_threshold}
          </Field>
          <Field>
            <Label htmlFor="unit">Unit</Label>
            {viewingProduct?.unit}
          </Field>
          <Field>
            <Label htmlFor="image-url">Image URL</Label>
            {viewingProduct?.image_url ? viewingProduct.image_url : "N/A"}
          </Field>
          <Field>
            <Label htmlFor="is-active">Is Active</Label>
            {viewingProduct?.is_active === 1 ? "Active" : "Inactive"}
          </Field>
          <Field>
            <Label htmlFor="created-at">Created At</Label>
            {viewingProduct?.created_at
              ? new Date(viewingProduct.created_at).toLocaleString("en-CA")
              : "N/A"}
          </Field>
          <Field>
            <Label htmlFor="updated-at">Updated At</Label>
            {viewingProduct?.updated_at
              ? new Date(viewingProduct.updated_at).toLocaleString("en-CA")
              : "N/A"}
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
