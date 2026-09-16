import { toast } from "@/components/ui/toast";

type NotifyOptions = {
  title?: string;
  type?: "success" | "info" | "warning" | "error";
};

export function notify(
  description: string,
  { title = "Bloomora Admin", type }: NotifyOptions = {},
) {
  return toast.add({ title, description, type });
}

export const notifySuccess = (description: string, title?: string) =>
  notify(description, { title, type: "success" });

export const notifyError = (description: string, title?: string) =>
  notify(description, { title, type: "error" });