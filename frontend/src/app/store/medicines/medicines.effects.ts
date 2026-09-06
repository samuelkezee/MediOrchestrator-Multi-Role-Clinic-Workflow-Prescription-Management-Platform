import { Injectable, inject } from "@angular/core";
import { MedicineService } from "../../core/services/medicine-service";
import {Actions as NgRxActions, createEffect, ofType} from "@ngrx/effects";
import { catchError, exhaustMap, map, of, tap } from "rxjs";
import { MedicinesState } from "./medicines.actions";
import * as MedicinesAction from "./medicines.actions";

@Injectable()
export class MedicineEffects{
    private actions$=inject(NgRxActions);
    private medicineService=inject(MedicineService);

    loadMedicines$=createEffect(()=>this.actions$.pipe(ofType(MedicinesAction.loadMedicines), exhaustMap(()=>this.medicineService.getAllMedicine().pipe(map((medicines)=>MedicinesAction.medicinesSuccess({medicines})),catchError((error)=>of(MedicinesAction.medicinesFailure({error})))))));
    saveMedicine$=createEffect(()=>this.actions$.pipe(ofType(MedicinesAction.saveMedicine), exhaustMap((action)=>this.medicineService.createMedicine(action.medicine).pipe(map((medicine)=>MedicinesAction.saveMedicineSuccess({medicine})),catchError((error)=>of(MedicinesAction.saveMedicineFailure({error})))))));
    deleteMedicine$=createEffect(()=>this.actions$.pipe(ofType(MedicinesAction.deleteMedicine), exhaustMap((action)=>this.medicineService.deleteMedicine(action.id).pipe(map(()=>MedicinesAction.deleteMedicineSuccess({id:action.id})),catchError((error)=>of(MedicinesAction.deleteMedicineFailure({error})))))));

}