import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { BonetaEndpoints } from '../shared/enums/boneta-endpoints.enum';
import { BonetaRoutes } from '../shared/enums/boneta-routes.enum';
import { BonetaStoredItems } from '../shared/enums/boneta-stored-items.enum';
import { User } from '../shared/models/user.model';
import { UserToken } from './models/user-token.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private user?: User;
  private token?: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  login(username: string, password: string): Observable<string> {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    return this.httpClient
      .post<UserToken>(
        `${environment.apiBaseUrl}/${BonetaEndpoints.Token}`,
        formData
      )
      .pipe(
        tap((userToken) => (this.user = userToken.user)),
        map((userToken) => userToken.token.accessToken),
        tap((accessToken) => this.setToken(accessToken))
      );
  }

  signup(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.httpClient
      .post<UserToken>(`${environment.apiBaseUrl}/${BonetaEndpoints.Users}`, {
        name: username,
        email,
        password,
      })
      .pipe(
        tap((userToken) => (this.user = userToken.user)),
        map((userToken) => userToken.token.accessToken),
        tap((accessToken) => this.setToken(accessToken))
      );
  }

  getUser(): Observable<User> {
    return this.user
      ? of(this.user)
      : this.httpClient
          .get<User>(
            `${environment.apiBaseUrl}/${BonetaEndpoints.Users}/current`
          )
          .pipe(tap((user) => (this.user = user)));
  }

  getToken(): string | undefined {
    if (!this.token) {
      this.token = sessionStorage.getItem(BonetaStoredItems.Token) ?? undefined;
    }
    if (!this.token) {
      this.router.navigate([BonetaRoutes.Authenticate]);
    }
    return this.token;
  }

  setToken(token: string): void {
    sessionStorage.setItem(BonetaStoredItems.Token, token);
    this.token = token;
  }
}
