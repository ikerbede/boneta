import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { BonetaRoutes } from '../shared/enums/boneta-routes.enum';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@Component({
  selector: 'bnt-auth',
  standalone: true,
  imports: [CommonModule, LoginComponent, SignupComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  isSignupDisplayed = false;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  login(credentials: { username: string; password: string }) {
    this.authService
      .login(credentials.username, credentials.password)
      .subscribe(() => this.router.navigate([BonetaRoutes.Songs]));
  }

  signup(credentials: { username: string; email: string; password: string }) {
    this.authService
      .signup(credentials.username, credentials.email, credentials.password)
      .subscribe(() => this.router.navigate([BonetaRoutes.Songs]));
  }
}
