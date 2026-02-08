export type Column<TItem> = {
  key: keyof TItem;
  label: string;
  icon: string;
  sortable: boolean;
  resizable: boolean;
  defaultWidth: number;
};
