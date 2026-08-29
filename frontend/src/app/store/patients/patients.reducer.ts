import { createReducer, on } from '@ngrx/store';
import * as PatientActions from './patients.actions';

export const initialPatientsState: PatientActions.PatientsState = { items: [], loading: false, saving: false, error: null };

export const patientsReducer = createReducer(
  initialPatientsState,
  on(PatientActions.loadPatients, (state) => ({ ...state, loading: true, error: null })),
  on(PatientActions.loadPatientsSuccess, (state, { patients }) => ({ ...state, items: patients, loading: false })),
  on(PatientActions.loadPatientsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(PatientActions.createPatient, (state) => ({ ...state, saving: true, error: null })),
  on(PatientActions.createPatientSuccess, (state, { patient }) => ({ ...state, items: [...state.items, patient], saving: false })),
  on(PatientActions.createPatientFailure, (state, { error }) => ({ ...state, saving: false, error })),
);
