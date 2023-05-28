export interface Song {
  id: number;
  title: string;
  author?: string;
  lyrics?: string;
  additionDate: Date;
  nbListenings: number;
}
