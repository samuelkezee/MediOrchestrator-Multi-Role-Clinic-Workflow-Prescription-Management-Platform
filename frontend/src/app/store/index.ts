import { ActionReducerMap } from "@ngrx/store"
import { AuthState } from "./auth/auth.actions"
import { authReducer } from "./auth/auth.reducer";
import { MedicinesState } from "./medicines/medicines.actions";
import { medicineReducer } from "./medicines/medicines.reducer";

export interface AppState{
    auth:AuthState;
    medicines: MedicinesState;
    
}

export const appReducers:ActionReducerMap<AppState>={
    auth:authReducer,
    medicines:medicineReducer,


};