export interface PackingListItem {
  id: number;
  name: string;
  packed: boolean;
}

export interface PackingList {
  id: number;
  name: string;
  items: PackingListItem[];
}
