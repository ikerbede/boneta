import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { BonetaEndpoints } from '../shared/enums/boneta-endpoints.enum';
import { BonetaRoutes } from '../shared/enums/boneta-routes.enum';
import { BonetaStoredItems } from '../shared/enums/boneta-stored-items.enum';
import { JsonWebToken } from './json-web-token.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private token: string | undefined;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly router: Router
  ) {}

  login(username: string, password: string): Observable<string> {
    const formData = new FormData();
    formData.set('username', username);
    formData.set('password', password);
    return this.httpClient
      .post<JsonWebToken>(
        `${environment.apiBaseUrl}/${BonetaEndpoints.Token}`,
        formData
      )
      .pipe(
        map((jwt) => jwt.accessToken),
        tap((token) => this.setToken(token))
      );
  }

  signup(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.httpClient
      .post<JsonWebToken>(
        `${environment.apiBaseUrl}/${BonetaEndpoints.Users}`,
        {
          name: username,
          email,
          password,
        }
      )
      .pipe(
        map((jwt) => jwt.accessToken),
        tap((token) => this.setToken(token))
      );
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
