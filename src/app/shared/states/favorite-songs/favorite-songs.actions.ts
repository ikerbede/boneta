import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Song } from '../../models/song.model';

export const FavoriteSongsActions = createActionGroup({
  source: 'Favorite Songs',
  events: {
    'Load All': emptyProps(),
    'Load All Success': props<{ songs: readonly Song[] }>(),
    'Add Favorite Song': props<{ song: Song }>(),
    'Add Favorite Song Success': props<{ song: Song }>(),
    'Remove Favorite Song': props<{ songId: number }>(),
    'Remove Favorite Song Success': props<{ songId: number }>(),
  },
});
