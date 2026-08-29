import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState } from './users.actions';
export const selectUsersState = createFeatureSelector<UsersState>('users');
export const selectUsers = createSelector(selectUsersState, (state) => state.items);
export const selectUsersLoading = createSelector(selectUsersState, (state) => state.loading);
export const selectUsersError = createSelector(selectUsersState, (state) => state.error);
