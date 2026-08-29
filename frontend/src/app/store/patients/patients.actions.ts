import { createAction, props } from '@ngrx/store';
import { PatientModel } from '../../core/models/class/Patient.Model';
import { IPatientListModel } from '../../core/models/interfaces/IPatientList.Model';

export const loadPatients = createAction('[Patients] Load');
export const loadPatientsSuccess = createAction('[Patients API] Load Success', props<{ patients: IPatientListModel[] }>());
export const loadPatientsFailure = createAction('[Patients API] Load Failure', props<{ error: string }>());
export const createPatient = createAction('[Patients] Create', props<{ patient: PatientModel }>());
export const createPatientSuccess = createAction('[Patients API] Create Success', props<{ patient: IPatientListModel }>());
export const createPatientFailure = createAction('[Patients API] Create Failure', props<{ error: string }>());

export interface PatientsState {
  items: IPatientListModel[];
  loading: boolean;
  saving: boolean;
  error: string | null;
}
