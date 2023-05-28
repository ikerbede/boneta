import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { selectSong } from '../states/songs/songs.selectors';

export const songGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const store = inject(Store);
  return (
    !!route.params['songId'] &&
    store
      .select(selectSong(+route.params['songId']))
      .pipe(map((song) => !!song))
  );
};
