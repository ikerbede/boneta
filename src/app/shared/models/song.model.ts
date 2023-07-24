export interface Song {
  id: number;
  title: string;
  additionDate: Date;
  nbViews: number;
  author?: string;
  lyrics?: string;
}
