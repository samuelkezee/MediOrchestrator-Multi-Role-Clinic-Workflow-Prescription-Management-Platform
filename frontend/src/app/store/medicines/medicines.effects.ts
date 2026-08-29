import { Injectable, inject } from '@angular/core';
import { Actions as NgRxActions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of } from 'rxjs';
import { MedicineService } from '../../core/services/medicine-service';
import * as MedicineActions from './medicines.actions';
@Injectable()
export class MedicinesEffects {
  private actions$ = inject(NgRxActions);
  private service = inject(MedicineService);
  load$ = createEffect(() => this.actions$.pipe(ofType(MedicineActions.loadMedicines), exhaustMap(() => this.service.getAllMedicine().pipe(map((medicines) => MedicineActions.medicinesSuccess({ medicines: Array.isArray(medicines) ? medicines : [] })), catchError((error) => of(MedicineActions.medicinesFailure({ error: error?.message || 'Unable to load medicines' })))))));
  save$ = createEffect(() => this.actions$.pipe(ofType(MedicineActions.saveMedicine), exhaustMap(({ medicine }) => (medicine.medicineId ? this.service.updateMedicine(medicine) : this.service.createMedicine(medicine)).pipe(map((saved) => MedicineActions.saveMedicineSuccess({ medicine: saved?.data || saved || medicine })), catchError((error) => of(MedicineActions.saveMedicineFailure({ error: error?.message || 'Unable to save medicine' })))))));
  delete$ = createEffect(() => this.actions$.pipe(ofType(MedicineActions.deleteMedicine), exhaustMap(({ id }) => this.service.deleteMedicine(id).pipe(map(() => MedicineActions.deleteMedicineSuccess({ id })), catchError((error) => of(MedicineActions.deleteMedicineFailure({ error: error?.message || 'Unable to delete medicine' })))))));
}
