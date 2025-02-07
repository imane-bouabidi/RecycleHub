import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  login,
  loginSuccess,
  loginFailure,
  signup,
  signupSuccess,
  signupFailure,
  logout
} from './auth.actions';
import { AuthService } from '../../services/auth/auth.service';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap(({ email, password }) => {
        const user = this.authService.login(email, password);

        if (user) {
          this.authService.setUser(user);
          return of(loginSuccess({ user })).pipe(
            tap(() => this.router.navigate(['/dashboard']))
          );
        } else {
          return of(loginFailure({ error: 'Email ou mot de passe incorrect' }));
        }
      })
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(({ user: userData }) => {
        try {
          const newUser = this.authService.registerUser(userData);
          this.authService.setUser(newUser);
          return of(signupSuccess({ user: newUser })).pipe(
            tap(() => this.router.navigate(['/login']))
          );
        } catch (error) {
          return of(signupFailure({ error: "Erreur lors de l'inscription" }));
        }
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(logout),
      map(() => {
        this.authService.logout();
        this.router.navigate(['/login']);
        return { type: '[Auth] Logout Complete' };
      })
    )
  );
}
