type ComponentTheme = "success" | "warning" | "danger" | "default" | "info";
type ComponentSize = "xs" | "sm" | "md" | "lg" | "xl";

type ButtonTheme = "light" | "lightC1" | ComponentTheme;

type ColumnValueRenderProps<T = any> = {
  item: T;
  value: any;
  name: string;
  index: number;
};

type TableColumn = {
  label: string;
  name: string;
  sort?: -1 | 1;
  columnValueClassName?: string;
  columnHeaderClassName?: string;
  columnValueRender?: (props: ColumnValueRenderProps) => any;
};

type TableProps<T> = {
  className?: string;
  loading?: boolean;
  items?: T[];
  columns?: TableColumn[];
  emptyComponent?: any;
  emptyComponentMessage?: string;
};

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  label?: string;
  labelClassName?: string;
  inputClassName?: string;
  footerComponent?: any;
  leftComponent?: any;
  rightComponent?: any;
  description?: string;
  textarea?: boolean;
  forwardRef?: any;
  inputBackground?: string;
  direction?: "row" |"col"
};
