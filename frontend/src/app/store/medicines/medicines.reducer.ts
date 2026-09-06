import  {createReducer, on} from "@ngrx/store";
import * as MedicineActions from "./medicines.actions";

export const initialMedicinesStatus:MedicineActions.MedicinesState={
    items:[],
    loading:false,
    error:null,
    saving:false,
    editing:false,
    deleting:false,
    savingError:null,
    editingError:null,
    deletingError:null,
};
export const medicineReducer=createReducer(
  initialMedicinesStatus,
  on(MedicineActions.loadMedicines,(state)=>({...state,loading:true,error:null})),
  on(MedicineActions.medicinesSuccess,(state,{medicines})=>({...state,items:medicines,loading:false})),
  on(MedicineActions.medicinesFailure,(state,{error})=>({...state,loading:false,error:error})),
  on(MedicineActions.saveMedicine,(state)=>({...state,saving:true,savingError:null})),
  on(MedicineActions.saveMedicineSuccess,(state,{medicine})=>({...state,saving:false,savingError:null})),
  on(MedicineActions.saveMedicineFailure,(state,{error})=>({...state,saving:false,savingError:error})),
  on(MedicineActions.deleteMedicine,(state)=>({...state,deleting:true,deletingError:null})),
  on(MedicineActions.deleteMedicineSuccess,(state,{id})=>({...state,deleting:false,deletingError:null})),
  on(MedicineActions.deleteMedicineFailure,(state,{error})=>({...state,deleting:false,deletingError:error})),
);