export type Order<TItem> = { key: keyof TItem; direction: 'asc' | 'desc' };
