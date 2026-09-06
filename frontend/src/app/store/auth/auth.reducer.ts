import { createReducer, on } from "@ngrx/store";
import * as AuthActions from './auth.actions'
import { AuthState } from "./auth.actions";


export const initialAuthState: AuthActions.AuthState = {
  user: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })),
  on(AuthActions.loginSuccess, (state, { response }) => ({ ...state, user: response.user, loading: false, error: null })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, loading: false, error: error })),
  on(AuthActions.logoutSuccess, () => initialAuthState)
);