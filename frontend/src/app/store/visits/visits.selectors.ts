import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VisitsState } from './visits.actions';
export const selectVisitsState = createFeatureSelector<VisitsState>('visits');
export const selectVisits = createSelector(selectVisitsState, (state) => state.items);
export const selectVisitsLoading = createSelector(selectVisitsState, (state) => state.loading);
export const selectVisitsError = createSelector(selectVisitsState, (state) => state.error);
