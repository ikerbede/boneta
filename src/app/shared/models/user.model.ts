import { Item } from './item.model';

export interface User {
  id: number;
  name: string;
  email: string;
  province?: Item;
}
