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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AddProductDialog() {
  const [open, setOpen] = useState<boolean>(false);

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleAddProduct = () => {
    handleOpenChange(false);
    console.log("add product");
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <form>
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
          <DialogHeader>
            <DialogTitle className="text-primary">Add New Product</DialogTitle>
            <DialogDescription>
              Add a new product to your inventory.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
              onClick={handleAddProduct}
            >
              <PlusIcon />
              Add Product
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
