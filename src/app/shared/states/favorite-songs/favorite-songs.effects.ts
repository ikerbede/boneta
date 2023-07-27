import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Song } from '../../models/song.model';
import { FavoriteSongsService } from '../../services/favorite-songs.service';
import { FavoriteSongsActions } from './favorite-songs.actions';

@Injectable()
export class FavoriteSongsEffects {
  constructor(
    private actions$: Actions,
    private favoriteSongsService: FavoriteSongsService
  ) {}

  loadFavoriteSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteSongsActions.loadAll),
      mergeMap(() =>
        this.favoriteSongsService.getFavoriteSongs().pipe(
          map((songs: readonly Song[]) =>
            FavoriteSongsActions.loadAllSuccess({ songs })
          ),
          catchError(() => of({ type: '[Favorite Songs] Load All Error' }))
        )
      )
    )
  );

  addFavoriteSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteSongsActions.addFavoriteSong),
      mergeMap((action) =>
        this.favoriteSongsService.addFavoriteSong(action.song.id).pipe(
          map(() =>
            FavoriteSongsActions.addFavoriteSongSuccess({ song: action.song })
          ),
          catchError(() =>
            of({ type: '[Favorite Songs] Add Favorite Song Error' })
          )
        )
      )
    )
  );

  removeFavoriteSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FavoriteSongsActions.removeFavoriteSong),
      mergeMap((action) =>
        this.favoriteSongsService.deleteFavoriteSong(action.songId).pipe(
          map(() =>
            FavoriteSongsActions.removeFavoriteSongSuccess({
              songId: action.songId,
            })
          ),
          catchError(() =>
            of({ type: '[FavoriteSongs] Remove FavoriteSong Error' })
          )
        )
      )
    )
  );
}
