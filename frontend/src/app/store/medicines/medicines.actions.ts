import { createAction, props } from '@ngrx/store';
import { MedicineModel } from '../../core/models/interfaces/Medicine.Model';

export const loadMedicines = createAction('[Medicines] Load');
export const medicinesSuccess = createAction('[Medicines API] Load Success', props<{ medicines: MedicineModel[] }>());
export const medicinesFailure = createAction('[Medicines API] Load Failure', props<{ error: string }>());
export const saveMedicine = createAction('[Medicines] Save', props<{ medicine: MedicineModel }>());
export const saveMedicineSuccess = createAction('[Medicines API] Save Success', props<{ medicine: MedicineModel }>());
export const saveMedicineFailure = createAction('[Medicines API] Save Failure', props<{ error: string }>());
export const deleteMedicine = createAction('[Medicines] Delete', props<{ id: number }>());
export const deleteMedicineSuccess = createAction('[Medicines API] Delete Success', props<{ id: number }>());
export const deleteMedicineFailure = createAction('[Medicines API] Delete Failure', props<{ error: string }>());
export interface MedicinesState { items: MedicineModel[]; loading: boolean; saving: boolean; error: string | null; }
