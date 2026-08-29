import { createReducer, on } from '@ngrx/store';
import * as Actions from './users.actions';

export const initialUsersState: Actions.UsersState = { items: [], loading: false, saving: false, error: null };
export const usersReducer = createReducer(initialUsersState,
  on(Actions.loadUsers, Actions.filterUsers, (state) => ({ ...state, loading: true, error: null })),
  on(Actions.usersSuccess, (state, { users }) => ({ ...state, items: users, loading: false })),
  on(Actions.usersFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(Actions.createUser, (state) => ({ ...state, saving: true, error: null })),
  on(Actions.createUserSuccess, (state, { user }) => ({ ...state, items: [...state.items, user], saving: false })),
  on(Actions.createUserFailure, (state, { error }) => ({ ...state, saving: false, error })),
);
