import { Item } from './item.model';

export interface Author {
  id: number;
  name: string;
  province?: Item;
  wikiLink?: string;
}
