import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { BonetaRoutes } from '../../enums/boneta-routes.enum';
import { Song } from '../../models/song.model';
import { SongsService } from '../../services/songs.service';
import { SongsActions } from './songs.actions';

@Injectable()
export class SongsEffects {
  constructor(
    private actions$: Actions,
    private readonly router: Router,
    private songsService: SongsService
  ) {}

  loadSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongsActions.loadAll),
      mergeMap(() =>
        this.songsService.getSongs().pipe(
          map((songs: readonly Song[]) =>
            SongsActions.loadAllSuccess({ songs })
          ),
          catchError(() => of({ type: '[Songs] Load All Error' }))
        )
      )
    )
  );

  addSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongsActions.addSong),
      mergeMap((action) =>
        this.songsService.addSong(action.song).pipe(
          tap(() => this.router.navigate([BonetaRoutes.Songs])),
          map((song: Song) => SongsActions.addSongSuccess({ song })),
          catchError(() => of({ type: '[Songs] Add Song Error' }))
        )
      )
    )
  );

  editSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongsActions.editSong),
      mergeMap((action) =>
        this.songsService.editSong(action.song).pipe(
          tap(() => this.router.navigate([BonetaRoutes.Songs])),
          map((song: Song) => SongsActions.editSongSuccess({ song })),
          catchError(() => of({ type: '[Songs] Edit Song Error' }))
        )
      )
    )
  );

  removeSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongsActions.removeSong),
      mergeMap((action) =>
        this.songsService.deleteSong(action.songId).pipe(
          map(() => SongsActions.removeSongSuccess({ songId: action.songId })),
          catchError(() => of({ type: '[Songs] Remove Song Error' }))
        )
      )
    )
  );

  viewSong$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SongsActions.viewSong),
      mergeMap((action) =>
        this.songsService.viewSong(action.songId).pipe(
          map(() => SongsActions.viewSongSuccess({ songId: action.songId })),
          catchError(() => of({ type: '[Songs] View Song Error' }))
        )
      )
    )
  );
}
