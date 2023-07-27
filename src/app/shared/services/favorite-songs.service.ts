import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BonetaEndpoints } from '../enums/boneta-endpoints.enum';
import { ApiSong } from '../models/api-song.model';
import { Song } from '../models/song.model';
import { AuthService } from '../../auth/auth.service';
import { mapApiSongToSong } from '../mappers/song.mappers';

@Injectable({ providedIn: 'root' })
export class FavoriteSongsService {
  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService
  ) {}

  getFavoriteSongs(): Observable<readonly Song[]> {
    return this.authService.getUser().pipe(
      switchMap((user) =>
        this.httpClient.get<ApiSong[]>(
          `${environment.apiBaseUrl}/${BonetaEndpoints.Users}/${user.id}/${BonetaEndpoints.FavoriteSongs}`
        )
      ),
      map((songs) => songs.map(mapApiSongToSong))
    );
  }

  addFavoriteSong(songId: number): Observable<void> {
    return this.authService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.httpClient.put<void>(
            `${environment.apiBaseUrl}/${BonetaEndpoints.Users}/${user.id}/${BonetaEndpoints.FavoriteSongs}`,
            { songId }
          )
        )
      );
  }

  deleteFavoriteSong(songId: number): Observable<void> {
    return this.authService
      .getUser()
      .pipe(
        switchMap((user) =>
          this.httpClient.delete<void>(
            `${environment.apiBaseUrl}/${BonetaEndpoints.Users}/${user.id}/${BonetaEndpoints.FavoriteSongs}/${songId}`
          )
        )
      );
  }
}
