import { createReducer, on } from '@ngrx/store';
import * as Actions from './visits.actions';
export const initialVisitsState: Actions.VisitsState = { items: [], loading: false, error: null };
export const visitsReducer = createReducer(initialVisitsState,
  on(Actions.loadVisits, (state) => ({ ...state, loading: true, error: null })),
  on(Actions.visitsSuccess, (state, { visits }) => ({ ...state, items: visits, loading: false })),
  on(Actions.visitsFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(Actions.createVisitSuccess, (state, { visit }) => ({ ...state, items: [...state.items, visit] })),
);
