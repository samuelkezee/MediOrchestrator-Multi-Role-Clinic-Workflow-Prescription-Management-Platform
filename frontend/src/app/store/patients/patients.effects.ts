import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, exhaustMap } from 'rxjs';
import { PatientService } from '../../core/services/patient-service';
import * as PatientActions from './patients.actions';

@Injectable()
export class PatientsEffects {
  private actions$ = inject(Actions);
  private patientService = inject(PatientService);

  load$ = createEffect(() => this.actions$.pipe(
    ofType(PatientActions.loadPatients),
    exhaustMap(() => this.patientService.getAllPatients().pipe(
      map((patients) => PatientActions.loadPatientsSuccess({ patients })),
      catchError((error) => of(PatientActions.loadPatientsFailure({ error: error?.message || 'Unable to load patients' }))),
    )),
  ));

  create$ = createEffect(() => this.actions$.pipe(
    ofType(PatientActions.createPatient),
    exhaustMap(({ patient }) => this.patientService.createNewpatient(patient).pipe(
      map((created) => PatientActions.createPatientSuccess({ patient: created })),
      catchError((error) => of(PatientActions.createPatientFailure({ error: error?.message || 'Unable to create patient' }))),
    )),
  ));
}
