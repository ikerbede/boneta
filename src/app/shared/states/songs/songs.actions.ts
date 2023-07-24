import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Song } from '../../models/song.model';

export const SongsActions = createActionGroup({
  source: 'Songs',
  events: {
    'Load All': emptyProps(),
    'Load All Success': props<{ songs: readonly Song[] }>(),
    'Add Song': props<{ song: Partial<Song> }>(),
    'Add Song Success': props<{ song: Song }>(),
    'View Song': props<{ songId: number }>(),
    'View Song Success': props<{ songId: number }>(),
    'Edit Song': props<{ song: Partial<Song> }>(),
    'Edit Song Success': props<{ song: Song }>(),
    'Remove Song': props<{ songId: number }>(),
    'Remove Song Success': props<{ songId: number }>(),
  },
});
