import { createSelector } from '@ngrx/store';
import { songsFeature } from './songs.reducer';

export const selectSongsByName = (input: string) =>
  createSelector(songsFeature.selectSongsState, (songs) =>
    songs
      .filter((song) => song.title.includes(input))
      .sort((a, b) => a.title.localeCompare(b.title))
  );

export const selectSongsSortedByAdditionDate = createSelector(
  songsFeature.selectSongsState,
  (songs) =>
    [...songs].sort((a, b) => (a.additionDate > b.additionDate ? -1 : 1))
);

export const selectSongsSortedByNbListenings = createSelector(
  songsFeature.selectSongsState,
  (songs) =>
    [...songs].sort((a, b) => (a.nbListenings > b.nbListenings ? -1 : 1))
);

export const selectSong = (songId: number) =>
  createSelector(songsFeature.selectSongsState, (songs) =>
    songs.find((song) => song.id === songId)
  );
