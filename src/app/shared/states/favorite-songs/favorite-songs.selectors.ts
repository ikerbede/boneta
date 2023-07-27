import { createSelector } from '@ngrx/store';
import { favoriteSongsFeature } from './favorite-songs.reducer';

export const selectFavoriteSongsByName = (input: string) =>
  createSelector(favoriteSongsFeature.selectFavoriteSongsState, (songs) =>
    songs
      .filter((song) => song.title.includes(input))
      .sort((a, b) => a.title.localeCompare(b.title))
  );

export const selectFavoriteSongsSortedByNbViews = createSelector(
  favoriteSongsFeature.selectFavoriteSongsState,
  (songs) => [...songs].sort((a, b) => (a.nbViews > b.nbViews ? -1 : 1))
);

export const selectFavoriteSong = (songId: number) =>
  createSelector(favoriteSongsFeature.selectFavoriteSongsState, (songs) =>
    songs.find((song) => song.id === songId)
  );
