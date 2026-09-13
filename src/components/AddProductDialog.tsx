import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldDescription, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createProduct } from "@/apis/products";

type Props = {
  onProductCreated: () => Promise<void>;
};

export default function AddProductDialog({ onProductCreated }: Props) {
  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [price, setPrice] = useState("");

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleAddProduct = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        sku,
        price: Number(price),
        stock_quantity: 0,
        low_stock_threshold: 0,
        unit: "item",
      };
      const res = await createProduct(payload);
      console.log(res);
      await onProductCreated();

      setName("");
      setSku("");
      setPrice("");

      handleOpenChange(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button
            variant="outline"
            className="bg-white text-primary hover:bg-primary hover:text-white"
          >
            <PlusIcon />
            Add New Product
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleAddProduct}>
          <DialogHeader>
            <DialogTitle className="text-primary text-2xl font-bold">
              Add New Product
            </DialogTitle>
            <DialogDescription>
              Add a new product to your inventory.
            </DialogDescription>
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
              {/* <Field>
                <Label htmlFor="cost-price">Cost Price</Label>
                <Input id="cost-price" type="number" placeholder="$0.00" />
              </Field> */}
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
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Field>
            </div>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
            >
              <PlusIcon />
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
