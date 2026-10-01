export interface ApiResponse<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  timestamp: string;
}

export interface PaginatedResponse<T = any> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
