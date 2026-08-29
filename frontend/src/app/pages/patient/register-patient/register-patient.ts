import { Component, inject, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientModel } from '../../../core/models/class/Patient.Model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import * as PatientActions from '../../../store/patients/patients.actions';

@Component({
  selector: 'app-register-patient',
  imports: [FormsModule],
  templateUrl: './register-patient.html',
  styleUrl: './register-patient.css',
})
export class RegisterPatient {
  @Input() showBanner: boolean = true;

  

  newPatientObj:PatientModel=new PatientModel();
  private store = inject(Store<AppState>);

  onRegister(){
    this.store.dispatch(PatientActions.createPatient({ patient: this.newPatientObj }));
    this.newPatientObj = new PatientModel();
    
  }


}
