import { createReducer, on } from '@ngrx/store';
import * as Actions from './medicines.actions';
export const initialMedicinesState: Actions.MedicinesState = 
{
   items: [], 
   loading: false, 
   saving: false, 
   error: null 
  };

export const medicinesReducer = createReducer(initialMedicinesState,
  on(Actions.loadMedicines, (state) => ({ ...state, loading: true, error: null })),
  on(Actions.medicinesSuccess, (state, { medicines }) => ({ ...state, items: medicines, loading: false })),
  on(Actions.medicinesFailure, (state, { error }) => ({ ...state, loading: false, error })),
  on(Actions.saveMedicine, (state) => ({ ...state, saving: true, error: null })),
  on(Actions.saveMedicineSuccess, (state, { medicine }) => ({ ...state, items: medicine.medicineId ? state.items.map((item) => item.medicineId === medicine.medicineId ? medicine : item) : [...state.items, medicine], saving: false })),
  on(Actions.saveMedicineFailure, Actions.deleteMedicineFailure, (state, { error }) => ({ ...state, saving: false, error })),
  on(Actions.deleteMedicine, (state) => ({ ...state, saving: true })),
  on(Actions.deleteMedicineSuccess, (state, { id }) => ({ ...state, items: state.items.filter((item) => item.medicineId !== id), saving: false })),
);
