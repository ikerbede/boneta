import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { BonetaEndpoints } from '../enums/boneta-endpoints.enum';
import { ApiSongViews } from '../models/api-song-views.model';
import { ApiSong } from '../models/api-song.model';
import { SongViews } from '../models/song-views.model';
import { Song } from '../models/song.model';

@Injectable({ providedIn: 'root' })
export class SongsService {
  constructor(private readonly httpClient: HttpClient) {}

  getSongs(): Observable<readonly Song[]> {
    return this.httpClient
      .get<ApiSong[]>(`${environment.apiBaseUrl}/${BonetaEndpoints.Songs}`)
      .pipe(
        map((songs) =>
          songs.map((song) => ({
            id: song.id,
            title: song.title,
            additionDate: new Date(song.additionDate),
            nbViews: song.nb_views,
            author: song.author ?? undefined,
            lyrics: song.lyrics ?? undefined,
          }))
        )
      );
  }

  addSong(newSong: Partial<Song>): Observable<Song> {
    return this.httpClient.post<Song>(
      `${environment.apiBaseUrl}/${BonetaEndpoints.Songs}`,
      newSong
    );
  }

  editSong(changedSong: Partial<Song>): Observable<Song> {
    return this.httpClient.put<Song>(
      `${environment.apiBaseUrl}/${BonetaEndpoints.Songs}/${changedSong.id}`,
      changedSong
    );
  }

  deleteSong(songId: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiBaseUrl}/${BonetaEndpoints.Songs}/${songId}`
    );
  }

  viewSong(songId: number): Observable<SongViews> {
    return this.httpClient
      .put<ApiSongViews>(
        `${environment.apiBaseUrl}/${BonetaEndpoints.Songs}/${songId}/views`,
        {}
      )
      .pipe(
        map((views: ApiSongViews) => ({
          lastViewDate: new Date(views.day_date),
          nbViews: views.nb_views,
        }))
      );
  }
}
