import { useState } from "react";
import { CheckIcon } from "lucide-react";
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
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProduct } from "@/apis/products";
import type { Product } from "@/types/products";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingProduct: Product;
  onProductUpdated: () => Promise<void>;
};

export default function EditProductDialog({
  open,
  onOpenChange,
  editingProduct,
  onProductUpdated,
}: Props) {
  const [name, setName] = useState(editingProduct.name);
  const [sku, setSku] = useState(editingProduct.sku);
  const [price, setPrice] = useState(editingProduct.price);
  const [stockQuantity, setStockQuantity] = useState(
    editingProduct.stock_quantity,
  );
  const handleOpenChange = (open: boolean) => {
    onOpenChange(open);
  };

  const handleUpdateProduct = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        sku,
        price,
        stock_quantity: stockQuantity,
      };
      const res = await updateProduct(editingProduct.id, payload);
      console.log(res);
      await onProductUpdated();

      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleUpdateProduct}>
          <DialogHeader>
            <DialogTitle className="text-primary text-2xl font-bold">
              Edit Product
            </DialogTitle>
            <DialogDescription>Edit the product details.</DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-4 mb-6">
            <Field>
              <Label htmlFor="product-name">* Product Name</Label>
              <Input
                id="product-name"
                name="product-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FieldDescription>
                Please enter the product name.
              </FieldDescription>
            </Field>
            <Field>
              <Label htmlFor="sku">* Product SKU</Label>
              <Input
                id="sku"
                name="sku"
                type="text"
                required
                value={sku}
                onChange={(e) => setSku(e.target.value)}
              />
              <FieldDescription>
                Please enter the SKU ,you can refer to existing ones.
              </FieldDescription>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="stock-quantity">Stock Quantity</Label>
                <Input
                  id="stock-quantity"
                  type="number"
                  placeholder="0"
                  value={stockQuantity}
                  onChange={(e) => setStockQuantity(Number(e.target.value))}
                />
                <FieldDescription>
                  Please enter the stock quantity.
                </FieldDescription>
              </Field>
              <Field>
                <Label htmlFor="price">* Selling Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  required
                  min={0.0}
                  step={0.01}
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <FieldDescription>
                  Please enter the selling price.
                </FieldDescription>
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
            >
              <CheckIcon />
              Update Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
