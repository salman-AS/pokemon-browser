import { useSearchParams } from 'react-router-dom';

interface PaginationConfig {
  defaultPage?: number;
  defaultPageSize?: number;
}

interface PaginationResult {
  page: number;
  pageSize: number;
  offset: number;
  setPage: (page: number) => void;
  setPageSize: (size: number) => void;
}

export function usePagination({ 
  defaultPage = 1, 
  defaultPageSize = 20 
}: PaginationConfig = {}): PaginationResult {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = Number.parseInt(searchParams.get('page') ?? String(defaultPage), 10);
  const pageSize = Number.parseInt(searchParams.get('size') ?? String(defaultPageSize), 10);
  
  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(newPage));
    setSearchParams(params, { replace: true });
  };
  
  const setPageSize = (newSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('size', String(newSize));
    params.set('page', '1'); // Reset to first page when changing page size
    setSearchParams(params, { replace: true });
  };

  return {
    page: Number.isNaN(page) ? defaultPage : page,
    pageSize: Number.isNaN(pageSize) ? defaultPageSize : pageSize,
    offset: ((Number.isNaN(page) ? defaultPage : page) - 1) * (Number.isNaN(pageSize) ? defaultPageSize : pageSize),
    setPage,
    setPageSize,
  };
}