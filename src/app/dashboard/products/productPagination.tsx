import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationProps {
  page_count: number;
  page: number;
  onPreviousClick: () => void;
  onPageClick: (page: number) => void;
  onNextClick: () => void;
}

const ProductPagination: React.FC<PaginationProps> = ({
  page_count,
  page,
  onPreviousClick,
  onPageClick,
  onNextClick,
}) => {
  return (
    <Pagination className="pt-5">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={onPreviousClick} />
        </PaginationItem>

        {[...Array(page_count)].map((_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={page === i + 1}
              onClick={(e) => {
                e.preventDefault();
                onPageClick(i + 1);
              }}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext href="#" onClick={onNextClick} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
