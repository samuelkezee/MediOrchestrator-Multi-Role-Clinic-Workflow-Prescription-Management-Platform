import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RegisterPatient } from '../register-patient/register-patient';
import { IPatientListModel } from '../../../core/models/interfaces/IPatientList.Model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import * as PatientActions from '../../../store/patients/patients.actions';
import { selectPatients } from '../../../store/patients/patients.selectors';

@Component({
  selector: 'app-patient-list',
  imports: [RegisterPatient],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit{
  isFormOpen=signal<boolean>(true);

  private store = inject(Store<AppState>);
  patientList = this.store.selectSignal(selectPatients);

  toggleFormVisibility(){
    this.isFormOpen.update((prev)=>!prev);

  }

  ngOnInit(): void {
    this.store.dispatch(PatientActions.loadPatients());
    
  }

}
