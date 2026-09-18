import { useState } from "react";
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
  onPageChange: (skip: number, limit: number) => void;
}

export default function PaginationComponent({
  onPageChange,
}: PaginationComponentProps) {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(25);
  const handlePageChange = (skip: number, limit: number) => {
    setSkip(skip);
    setLimit(limit);
    onPageChange(skip, limit);
  };

  return (
    <div className="flex items-center justify-between gap-4">
      <Field orientation="horizontal" className="w-fit">
        <FieldLabel htmlFor="select-rows-per-page">Rows per page</FieldLabel>
        <Select defaultValue="25">
          <SelectTrigger className="w-20" id="select-rows-per-page">
            <SelectValue />
          </SelectTrigger>
          <SelectContent align="start">
            <SelectGroup>
              <SelectItem onClick={() => handlePageChange(0, 10)} value="10">
                10
              </SelectItem>
              <SelectItem onClick={() => handlePageChange(0, 25)} value="25">
                25
              </SelectItem>
              <SelectItem onClick={() => handlePageChange(0, 50)} value="50">
                50
              </SelectItem>
              <SelectItem onClick={() => handlePageChange(0, 100)} value="100">
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
              onClick={() => handlePageChange(Math.max(0, skip - limit), limit)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              onClick={() => handlePageChange(skip + limit, limit)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
