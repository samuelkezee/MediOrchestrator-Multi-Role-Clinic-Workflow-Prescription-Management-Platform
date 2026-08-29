import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, tap, exhaustMap } from 'rxjs';
import { Userservices } from '../../core/services/userservices';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private usersService = inject(Userservices);
  private router = inject(Router);

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    exhaustMap(({ credentials }) => this.usersService.onLogin(credentials).pipe(
      map((response) => AuthActions.loginSuccess({ response })),
      catchError((error) => of(AuthActions.loginFailure({ error: error?.error?.message || 'Login failed' }))),
    )),
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(({ response }) => {
      this.usersService.setLoggedUser(response);
      void this.router.navigate(['/users']);
    }),
  ), { dispatch: false });

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logout),
    tap(() => {
      this.usersService.logout();
      void this.router.navigate(['/login']);
    }),
    map(() => AuthActions.logoutSuccess()),
  ));
}
