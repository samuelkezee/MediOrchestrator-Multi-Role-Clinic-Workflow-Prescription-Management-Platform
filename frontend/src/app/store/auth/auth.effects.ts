import { Injectable, inject } from "@angular/core";
import { Actions,createEffect, ofType } from "@ngrx/effects";
import { Router } from "@angular/router";
import { Userservices } from "../../core/services/userservices";
import * as AuthActions from "../auth/auth.actions"
import { catchError, exhaustMap, map, of, tap } from "rxjs";



@Injectable()
export class AuthEffects{
    private actions$ = inject(Actions);
    private userService=inject(Userservices);
    private router=inject(Router);



    login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.login),
    exhaustMap(({ credentials }) => this.userService.onLogin(credentials).pipe(
      map((response) => AuthActions.loginSuccess({ response })),
      catchError((error) => of(AuthActions.loginFailure({ error: error?.error?.message || 'Login failed' }))),
    )),
  ));

    

    loginSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.loginSuccess),
    tap(({ response }) => {
      this.userService.setLoggedUser(response);
      void this.router.navigate(['/users']);
    }),
  ), { dispatch: false });


}


