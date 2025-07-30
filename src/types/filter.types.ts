export type FilterOption = {
  id: string;
  label: string;
  count: number;
};

export type FilterState = Record<string, string[]>; 