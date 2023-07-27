import { ApiSong } from '../models/api-song.model';
import { Song } from '../models/song.model';

export function mapApiSongToSong(apiSong: ApiSong): Song {
  return {
    id: apiSong.id,
    title: apiSong.title,
    additionDate: new Date(apiSong.additionDate),
    nbViews: apiSong.nb_views,
    author: apiSong.author ?? undefined,
    lyrics: apiSong.lyrics ?? undefined,
  };
}
