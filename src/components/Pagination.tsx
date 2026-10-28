import { Field, FieldLabel } from "@/components/ui/field";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PaginationComponentProps {
  page: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
}

export default function PaginationComponent({
  page,
  pageSize,
  onPageChange,
}: PaginationComponentProps) {
  const isFirstPage = page <= 1;
  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select defaultValue={pageSize.toString()}>
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem
                className="text-primary"
                value="10"
                onClick={() => onPageChange(1, 10)}
              >
                10
              </SelectItem>
              <SelectItem
                className="text-primary"
                value="25"
                onClick={() => onPageChange(1, 25)}
              >
                25
              </SelectItem>
              <SelectItem
                className="text-primary"
                value="50"
                onClick={() => onPageChange(1, 50)}
              >
                50
              </SelectItem>
              <SelectItem
                className="text-primary"
                value="100"
                onClick={() => onPageChange(1, 100)}
              >
                100
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>
      <Pagination className="mx-0 w-auto">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                isFirstPage ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => onPageChange(page - 1, pageSize)}
            />
          </PaginationItem>
          <PaginationItem>
            <span className="text-sm text-primary">Page {page}</span>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(page + 1, pageSize)} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
