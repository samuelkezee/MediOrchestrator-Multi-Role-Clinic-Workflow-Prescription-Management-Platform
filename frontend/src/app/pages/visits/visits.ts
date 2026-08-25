import { Component, inject, OnInit, signal, WritableSignal, OnDestroy } from '@angular/core';
import { AsyncPipe, NgClass } from "@angular/common";
import { PatientService } from '../../core/services/patient-service';
import { IPatientListModel } from '../../core/models/interfaces/IPatientList.Model';
import { Subscription } from 'rxjs';
import { Userservices } from '../../core/services/userservices';
import { LoginModel } from '../../core/models/class/User.Model';
import { GlobalConstants } from '../../core/constants/GlobalConstants';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-visits',
  imports: [NgClass, AsyncPipe],
  templateUrl: './visits.html',
  styleUrl: './visits.css',
})
export class Visits implements OnInit,OnDestroy{

  isFormOpen=signal(true);
  toggleFormVisibility=()=>{
    this.isFormOpen.set(!this.isFormOpen());
  }

  patientSrv=inject(PatientService);
  userSrv=inject(Userservices)
 
  doctorList:WritableSignal<LoginModel[]>=signal([]);


  subscriptionList:Subscription[] =[];
  patientList$:Observable<IPatientListModel[]>=new Observable<IPatientListModel[]>();
  

  ngOnInit(){
    // this.getAllpatients();
    this.patientList$=this.patientSrv.getAllPatients();
  }


  // getAllpatients(){
  //   this.subscriptionList.push(this.patientSrv.getAllPatients().subscribe({
  //     next:(res:IPatientListModel[])=>{
  //       this.patientList.set(res);
  //     },
  //     error:(err:any)=>{
  //       console.log(err);
  //     }
  //   }));

  // }

  getAllDoctors(){
    this.subscriptionList.push(this.userSrv.filterUsers('?roleName=' + GlobalConstants.ROLE.DOCTOR).subscribe({
      next:(res:any)=>{
        const list = Array.isArray(res) ? res : (res?.data || []);
        this.doctorList.set(list);
      },
      error:(err:any)=>{
        console.log(err);
      } 
    }));
  }

  ngOnDestroy(){
    this.subscriptionList.forEach((sub:Subscription)=>sub.unsubscribe());
  }  







}
