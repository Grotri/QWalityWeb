export interface IPageTemplate {
  backPath?: string;
  headerTitle?: string;
  canScroll?: boolean;
  hasMenu?: boolean;
  isMainPage?: boolean;
  search?: string;
  setSearch?: (value: string) => void;
}
