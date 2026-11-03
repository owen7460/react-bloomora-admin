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
import { createSupplier } from "@/apis/suppliers";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  onSupplierCreated: () => Promise<void>;
};

export default function AddSupplierDialog({ onSupplierCreated }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactName, setContactName] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [note, setNote] = useState("");

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleAddSupplier = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        name,
        email,
        phone,
        contact_name: contactName,
        is_active: isActive,
        note,
      };
      const res = await createSupplier(payload);
      console.log(res);
      await onSupplierCreated();

      setName("");
      setEmail("");
      setPhone("");
      setContactName("");
      setIsActive(true);
      setNote("");

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
            Add New Supplier
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleAddSupplier}>
          <DialogHeader>
            <DialogTitle className="text-primary text-2xl font-bold">
              Add New Supplier
            </DialogTitle>
            <DialogDescription>
              Add a new supplier to your system.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="mt-4 mb-6">
            <Field>
              <Label htmlFor="supplier-name">* Supplier Name</Label>
              <Input
                id="supplier-name"
                name="supplier-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FieldDescription>
                Please enter the name of the supplier.
              </FieldDescription>
            </Field>
            <Field>
              <Label htmlFor="email">* Email</Label>
              <Input
                id="email"
                name="email"
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FieldDescription>
                Please enter the email of the supplier.
              </FieldDescription>
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <Label htmlFor="phone">* Phone</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FieldDescription>
                  Please enter the phone of the supplier.
                </FieldDescription>
              </Field>
              <Field>
                <Label htmlFor="contact-name">* Contact Name</Label>
                <Input
                  id="contact-name"
                  name="contact-name"
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                />
                <FieldDescription>
                  Please enter the contact name of the supplier.
                </FieldDescription>
              </Field>
            </div>
            <Field>
              <Label htmlFor="is-active">* Status</Label>
              <FieldDescription>
                Please select the status of the supplier.
              </FieldDescription>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is-active"
                  checked={isActive}
                  onCheckedChange={(checked) => setIsActive(Boolean(checked))}
                />
                <Label htmlFor="is-active">
                  {isActive ? "Active" : "Inactive"}
                </Label>
              </div>
            </Field>
            <Field>
              <Label htmlFor="note">* Note</Label>
              <Textarea
                id="note"
                name="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
              <FieldDescription>
                Please enter the note of the supplier.
              </FieldDescription>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90"
            >
              <PlusIcon />
              Add Supplier
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
