import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { AddSongComponent } from './add-song/add-song.component';
import { AuthComponent } from './auth/auth.component';
import { EditSongComponent } from './edit-song/edit-song.component';
import { MainComponent } from './main/main.component';
import { BonetaRoutes } from './shared/enums/boneta-routes.enum';
import { songGuard } from './shared/guards/song.guard';
import { SongsEffects } from './shared/states/songs/songs.effects';
import { songsFeature } from './shared/states/songs/songs.reducer';
import { SongComponent } from './song/song.component';

export const BONETA_ROUTES: Routes = [
  { path: BonetaRoutes.Authenticate, component: AuthComponent },
  {
    path: BonetaRoutes.Songs,
    component: MainComponent,
    providers: [provideState(songsFeature), provideEffects(SongsEffects)],
  },
  {
    path: `${BonetaRoutes.Songs}/${BonetaRoutes.New}`,
    component: AddSongComponent,
  },
  {
    path: `${BonetaRoutes.Songs}/:songId`,
    component: SongComponent,
    canActivate: [songGuard],
  },
  {
    path: `${BonetaRoutes.Songs}/:songId/${BonetaRoutes.Edit}`,
    component: EditSongComponent,
    canActivate: [songGuard],
  },
  { path: '', redirectTo: `/${BonetaRoutes.Authenticate}`, pathMatch: 'full' },
];
