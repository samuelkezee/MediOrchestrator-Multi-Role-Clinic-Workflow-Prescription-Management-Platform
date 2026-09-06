import { createAction, props } from "@ngrx/store";
import { MedicineModel } from "../../core/models/interfaces/Medicine.Model";

export const loadMedicines=createAction('[Medicines API] Load Medicines');
export const medicinesSuccess=createAction('[Medicines API] Load Success',props<{medicines:MedicineModel[]}>());
export const medicinesFailure=createAction('[Medicines API] Load Failure',props<{error:string}>());
export const saveMedicine=createAction('[Medicines API] Save Medicine',props<{medicine:MedicineModel}>());
export const saveMedicineSuccess=createAction('[Medicines API] Save Success',props<{medicine:MedicineModel}>());
export const saveMedicineFailure=createAction('[Medicines API] Save Failure',props<{error:string}>());
export const deleteMedicine=createAction('[Medicines API] Delete Medicine',props<{id:number}>());
export const deleteMedicineSuccess=createAction('[Medicines API] Delete Success',props<{id:number}>());
export const deleteMedicineFailure=createAction('[Medicines API] Delete Failure',props<{error:string}>());


export interface MedicinesState{
    items:MedicineModel[];
    loading:boolean;
    error:string|null;
    saving:boolean;
    editing:boolean;
    deleting:boolean;
    savingError:string|null;
    editingError:string|null;
    deletingError:string|null;
}