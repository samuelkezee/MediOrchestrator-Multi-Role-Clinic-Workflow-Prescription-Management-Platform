import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PatientsState } from './patients.actions';

export const selectPatientsState = createFeatureSelector<PatientsState>('patients');
export const selectPatients = createSelector(selectPatientsState, (state) => state.items);
export const selectPatientsLoading = createSelector(selectPatientsState, (state) => state.loading);
export const selectPatientsSaving = createSelector(selectPatientsState, (state) => state.saving);
export const selectPatientsError = createSelector(selectPatientsState, (state) => state.error);
