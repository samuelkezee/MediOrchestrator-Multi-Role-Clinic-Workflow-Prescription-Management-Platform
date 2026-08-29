import { createAction, props } from '@ngrx/store';
import { userModel } from '../../core/models/class/User.Model';
import { UserResponseModel } from '../../core/models/interfaces/User.Model';

export const loadUsers = createAction('[Users] Load');
export const filterUsers = createAction('[Users] Filter', props<{ role: string }>());
export const usersSuccess = createAction('[Users API] Load Success', props<{ users: UserResponseModel[] }>());
export const usersFailure = createAction('[Users API] Load Failure', props<{ error: string }>());
export const createUser = createAction('[Users] Create', props<{ user: userModel }>());
export const createUserSuccess = createAction('[Users API] Create Success', props<{ user: UserResponseModel }>());
export const createUserFailure = createAction('[Users API] Create Failure', props<{ error: string }>());

export interface UsersState { items: UserResponseModel[]; loading: boolean; saving: boolean; error: string | null; }
