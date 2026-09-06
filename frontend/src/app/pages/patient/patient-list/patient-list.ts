import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { RegisterPatient } from '../register-patient/register-patient';
import { IPatientListModel } from '../../../core/models/interfaces/IPatientList.Model';
import { PatientService } from '../../../core/services/patient-service';

@Component({
  selector: 'app-patient-list',
  imports: [RegisterPatient],
  templateUrl: './patient-list.html',
  styleUrl: './patient-list.css',
})
export class PatientList implements OnInit{
  isFormOpen=signal<boolean>(true);

  patientList:WritableSignal<IPatientListModel[]>=signal([]);
  patientSrv = inject(PatientService);

  toggleFormVisibility(){
    this.isFormOpen.update((prev)=>!prev);

  }

  ngOnInit(): void {
    this.loadPatientList();
    
  }

  loadPatientList(){
    this.patientSrv.getAllPatients().subscribe({
      next:(res:IPatientListModel[])=>{
        this.patientList.set(res);
      },
      error:(err:any)=>{
        console.log(err);
      }
    });
  }  
}
