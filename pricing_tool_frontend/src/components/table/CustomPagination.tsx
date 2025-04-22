import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useProductStore } from "@/store/productStore";
import { getPaginationText } from "@/utils/format-utils";

export function CustomPagination() {
  const { pagination, fetchProducts, filters } = useProductStore();
  const { currentPage, pageSize, count, previous, next } = pagination;
  const handlePageChange = (page: number) => {
    fetchProducts(filters.searchQuery, filters.category, page);
  };

  const paginationText = getPaginationText(currentPage, pageSize, count);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationPrevious
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={previous === null}
        />
        <span>{paginationText}</span>

        <PaginationNext
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={next === null}
        />
      </PaginationContent>
    </Pagination>
  );
}
