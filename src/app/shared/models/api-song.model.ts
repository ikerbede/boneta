export interface ApiSong {
  id: number;
  title: string;
  additionDate: Date;
  nb_views: number;
  author?: string;
  lyrics?: string;
}
