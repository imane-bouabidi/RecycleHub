import {inject, Injectable} from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import {
  login,
  loginSuccess,
  loginFailure,
  signup,
  signupSuccess,
  signupFailure
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
      mergeMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map(user => {
            this.router.navigate(['/dashboard']);
            return loginSuccess({ user });
          }),
          catchError(error => of(loginFailure({ error: error.message })))
        )
      )
    )
  );

  signup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signup),
      mergeMap(({ user }) =>
        this.authService.signup(user).pipe(
          map((newUser) => {
            this.router.navigate(['/dashboard']);
            return signupSuccess({ user: newUser });
          }),
          catchError((error) => of(signupFailure({ error: error.message })))
        )
      )
    )
  );
}
