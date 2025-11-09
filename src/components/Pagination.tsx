import { memo } from "react";
import "./Pagination.css";

interface PaginationProps {
  readonly onPrev?: () => void;
  readonly onNext?: () => void;
  readonly hasPrev: boolean;
  readonly hasNext: boolean;
}

function Pagination({ onPrev, onNext, hasPrev, hasNext }: Readonly<PaginationProps>) {
  return (
    <nav className="pagination" aria-label="Page navigation">
      <button 
        className="pagination-button" 
        onClick={onPrev}
        disabled={!hasPrev}
        aria-label="Go to previous page"
      >
      Prev
      </button>
      <button 
        className="pagination-button" 
        onClick={onNext}
        disabled={!hasNext}
        aria-label="Go to next page"
      >
      Next
      </button>
    </nav>
  );
}

// Memoize to prevent unnecessary re-renders
export default memo(Pagination);

