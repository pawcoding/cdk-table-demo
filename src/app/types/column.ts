export type Column<TItem> = {
  key: keyof TItem;
  label: string;
  icon: string;
};
