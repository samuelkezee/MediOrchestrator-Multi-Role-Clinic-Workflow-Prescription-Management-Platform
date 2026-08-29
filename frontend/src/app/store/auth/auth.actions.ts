import { createAction, props } from '@ngrx/store';
import { LoginModel } from '../../core/models/class/User.Model';
import { LoginAPIResponseModel, UserResponseModel } from '../../core/models/interfaces/User.Model';

export const login = createAction('[Auth] Login', props<{ credentials: LoginModel }>());
export const loginSuccess = createAction('[Auth API] Login Success', props<{ response: LoginAPIResponseModel }>());
export const loginFailure = createAction('[Auth API] Login Failure', props<{ error: string }>());
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

export interface AuthState {
  user: UserResponseModel | null;
  loading: boolean;
  error: string | null;
}
