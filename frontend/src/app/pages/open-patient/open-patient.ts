import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../../core/services/patient-service';
import { IPatientListModel } from '../../core/models/interfaces/IPatientList.Model';
import { VisitService } from '../../core/services/visit-service';
import { IVisitListModel } from '../../core/models/interfaces/IVisit.Model';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-open-patient',
  imports: [],
  templateUrl: './open-patient.html',
  styleUrl: './open-patient.css',
})
export class OpenPatient {


  activatedRoute = inject(ActivatedRoute)
  patientService = inject(PatientService)
  visitService = inject(VisitService)


  currentPatientId: number = 0;
  patientData: WritableSignal<IPatientListModel> = signal<IPatientListModel>({
    fullName: "",
    gender: "",
    dateOfBirth: "",
    phone: "",
    address: "",
    patientId: 0,
  })
  visitList: WritableSignal<IVisitListModel[]> = signal<IVisitListModel[]>([])
  selectedVisit?: IVisitListModel;



  constructor() {
    this.activatedRoute.params.subscribe({
      next: (param: any) => {
        this.currentPatientId = param['patientId'];
      }
    })
    this.getPatientById();
    this.getVisitByPatientId();
  }
  getPatientById() {
    this.patientService.getPatientByPId(this.currentPatientId).subscribe({
      next: (patient: any) => {
        this.patientData.set(patient);

      }
    })
  }
  getVisitByPatientId() {
    this.visitService.getPatientVisitById(this.currentPatientId).subscribe({
      next: (visit: IVisitListModel[]) => {
        this.visitList.set(visit);

      }
    })
  }
  onSelectVisit(VisitData:IVisitListModel){
    this.selectedVisit=VisitData;
  }
};
