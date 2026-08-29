import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.actions';
import { patientsReducer } from './patients/patients.reducer';
import { PatientsState } from './patients/patients.actions';
import { usersReducer } from './users/users.reducer';
import { UsersState } from './users/users.actions';
import { medicinesReducer } from './medicines/medicines.reducer';
import { MedicinesState } from './medicines/medicines.actions';
import { visitsReducer } from './visits/visits.reducer';
import { VisitsState } from './visits/visits.actions';

export interface AppState {
  auth: AuthState;
  patients: PatientsState;
  users: UsersState;
  medicines: MedicinesState;
  visits: VisitsState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  patients: patientsReducer,
  users: usersReducer,
  medicines: medicinesReducer,
  visits: visitsReducer,
};
