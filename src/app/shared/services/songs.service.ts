import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { BonetaEndpoints } from '../enums/boneta-endpoints.enum';
import { Song } from '../models/song.model';

@Injectable({ providedIn: 'root' })
export class SongsService {
  constructor(private readonly httpClient: HttpClient) {}

  getSongs(): Observable<readonly Song[]> {
    return this.httpClient.get<Song[]>(
      `${environment.apiBaseUrl}/${BonetaEndpoints.Songs}`
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
}
