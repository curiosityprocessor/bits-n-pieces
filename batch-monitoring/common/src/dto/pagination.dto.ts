import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "../constants/pagination.constants";

/**
 * Standard pagination query parameters.
 */
export interface PaginationDto {
  page?: number;
  pageSize?: number;
}

/**
 * Resolved pagination parameters with guaranteed defaults applied.
 */
export interface ResolvedPaginationDto {
  page: number;
  pageSize: number;
  skip: number;
}

/**
 * Generic paginated API response envelope.
 */
export interface PaginatedResponseDto<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export function resolvePagination(dto: PaginationDto): ResolvedPaginationDto {
  const page = dto.page ?? DEFAULT_PAGE;
  const pageSize = dto.pageSize ?? DEFAULT_PAGE_SIZE;
  return { page, pageSize, skip: (page - 1) * pageSize };
}
