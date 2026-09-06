import { createFeatureSelector, createSelector } from "@ngrx/store";
import {AuthState} from './auth.actions'


export const selectAuthState=createFeatureSelector<AuthState>('auth');
export const selectLoggedUser=createSelector(selectAuthState,(state)=>state.user);
export const selectAuthLoading=createSelector(selectAuthState,(state)=>state.loading);
export const selectAuthError=createSelector(selectAuthState,(state)=>state.error);
//derived state 
export const selectIsAuthenticated=createSelector(selectAuthState,(state)=>!!state.user);
export const selectAuthRole=createSelector(selectAuthState,(state)=>state.user?.roleName);