import { Component, inject, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PatientModel } from '../../../core/models/class/Patient.Model';
import { PatientService } from '../../../core/services/patient-service';
import { IPatientListModel } from '../../../core/models/interfaces/IPatientList.Model';

@Component({
  selector: 'app-register-patient',
  imports: [FormsModule],
  templateUrl: './register-patient.html',
  styleUrl: './register-patient.css',
})
export class RegisterPatient {
  @Input() showBanner: boolean = true;

  

  newPatientObj:PatientModel=new PatientModel();
  patientSrv=inject(PatientService)

  onRegister(){
    debugger
    this.patientSrv.createNewpatient(this.newPatientObj).subscribe({
      next:(res:IPatientListModel)=>{
        debugger
        console.log(res);
        this.newPatientObj=new PatientModel()
      }, 
      error:(err)=>{
        console.log(err);
      }
    });
    
  }


}
