import { createFeature, createReducer, on } from '@ngrx/store';
import { Song } from '../../models/song.model';
import { FavoriteSongsActions } from './favorite-songs.actions';

export const favoriteSongsFeatureKey = 'favoriteSongs';

export const initialState: readonly Song[] = [];

export const favoriteSongsReducer = createReducer(
  initialState,
  on(FavoriteSongsActions.loadAllSuccess, (_state, { songs }) => songs),
  on(FavoriteSongsActions.addFavoriteSongSuccess, (_state, { song }) => [
    ..._state,
    song,
  ]),
  on(FavoriteSongsActions.removeFavoriteSongSuccess, (_state, { songId }) =>
    _state.filter(({ id }) => id !== songId)
  )
);

export const favoriteSongsFeature = createFeature({
  name: favoriteSongsFeatureKey,
  reducer: favoriteSongsReducer,
});

export const { name, reducer, selectFavoriteSongsState } = favoriteSongsFeature;
