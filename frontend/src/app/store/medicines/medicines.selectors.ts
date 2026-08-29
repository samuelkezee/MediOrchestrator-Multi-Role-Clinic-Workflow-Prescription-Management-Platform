import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MedicinesState } from './medicines.actions';
export const selectMedicinesState = createFeatureSelector<MedicinesState>('medicines');
export const selectMedicines = createSelector(selectMedicinesState, (state) => state.items);
export const selectMedicinesLoading = createSelector(selectMedicinesState, (state) => state.loading);
export const selectMedicinesError = createSelector(selectMedicinesState, (state) => state.error);
