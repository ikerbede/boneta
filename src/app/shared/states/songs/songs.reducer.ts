import { createFeature, createReducer, on } from '@ngrx/store';
import { Song } from '../../models/song.model';
import { SongsActions } from './songs.actions';

export const songsFeatureKey = 'songs';

export const initialState: readonly Song[] = [];

export const songsReducer = createReducer(
  initialState,
  on(SongsActions.loadAllSuccess, (_state, { songs }) => songs),
  on(SongsActions.addSongSuccess, (_state, { song }) => [..._state, song]),
  on(SongsActions.editSongSuccess, (_state, { song }) =>
    [..._state].splice(
      _state.findIndex(({ id }) => id === song.id),
      1,
      song
    )
  ),
  on(SongsActions.removeSongSuccess, (_state, { songId }) =>
    _state.filter(({ id }) => id !== songId)
  )
);

export const songsFeature = createFeature({
  name: songsFeatureKey,
  reducer: songsReducer,
});

export const { name, reducer, selectSongsState } = songsFeature;
