import { createAction, props } from "@ngrx/store";
import { LoginModel } from "../../core/models/class/User.Model";
import { LoginAPIResponseModel, UserResponseModel } from '../../core/models/interfaces/User.Model';

export const login = createAction('[Auth] login', props<{ credentials: LoginModel }>());
export const loginSuccess=createAction('[AuthAPI] login success',props<{response:LoginAPIResponseModel}>());
export const loginFailure =createAction('[AuthAPI] login failure',props<{error:string}>());
export const logout=createAction('[Auth] logout');
export const logoutSuccess=createAction('[Auth] logout Success');


export interface AuthState{
    user:UserResponseModel|null;
    loading:boolean;
    error:string|null;   
}