import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { Userservices } from '../../core/services/userservices';
import * as UserActions from './users.actions';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private service = inject(Userservices);
  load$ = createEffect(() => this.actions$.pipe(ofType(UserActions.loadUsers), exhaustMap(() => this.service.getAllUsers().pipe(map((users) => UserActions.usersSuccess({ users })), catchError((error) => of(UserActions.usersFailure({ error: error?.message || 'Unable to load users' })))))));
  filter$ = createEffect(() => this.actions$.pipe(ofType(UserActions.filterUsers), exhaustMap(({ role }) => this.service.filterUsers(role).pipe(map((users) => UserActions.usersSuccess({ users })), catchError((error) => of(UserActions.usersFailure({ error: error?.message || 'Unable to filter users' })))))));
  create$ = createEffect(() => this.actions$.pipe(ofType(UserActions.createUser), exhaustMap(({ user }) => this.service.onCreateUser(user).pipe(map((created) => UserActions.createUserSuccess({ user: created })), catchError((error) => of(UserActions.createUserFailure({ error: error?.message || 'Unable to create user' })))))));
}
