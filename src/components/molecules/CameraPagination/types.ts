export interface ICameraPagination {
  total: number;
  current: number;
  onPageChange: (page: number) => void;
}
