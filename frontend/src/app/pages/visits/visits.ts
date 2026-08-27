import { Component, inject, OnInit, signal, WritableSignal, OnDestroy } from '@angular/core';
import { AsyncPipe, NgClass } from "@angular/common";
import { PatientService } from '../../core/services/patient-service';
import { IPatientListModel } from '../../core/models/interfaces/IPatientList.Model';
import { Subscription } from 'rxjs';
import { Userservices } from '../../core/services/userservices';
import { UserResponseModel } from '../../core/models/interfaces/User.Model';
import { GlobalConstants } from '../../core/constants/GlobalConstants';
import { Observable } from 'rxjs';
import { VisitService } from '../../core/services/visit-service';
import { IVisitListModel } from '../../core/models/interfaces/IVisit.Model';
import { HideShowBtn } from '../../shared/directives/hide-show-btn';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-visits',
  imports: [NgClass, AsyncPipe, HideShowBtn, RouterLink],
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
  visitSrv=inject(VisitService)
 
 

  subscriptionList:Subscription[] =[];
  patientList$:Observable<IPatientListModel[]>=new Observable<IPatientListModel[]>();
  DoctorList$:Observable<UserResponseModel[]>=new Observable<UserResponseModel[]>();
  visitList$:Observable<IVisitListModel[]>=new Observable<IVisitListModel[]>();
  

  ngOnInit(){
    // this.getAllpatients();
    this.DoctorList$=this.userSrv.filterUsers(String(GlobalConstants.ROLE.DOCTOR));
    this.patientList$=this.patientSrv.getAllPatients();
    this.visitList$=this.visitSrv.getVisitsList();
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

//   getAllDoctors() {
//   this.subscriptionList.push(
//     this.userSrv
//       .filterUsers(String(GlobalConstants.ROLE.DOCTOR))
//       .subscribe({
//         next: (res: any) => {
//           const list = Array.isArray(res) ? res : (res || []);
//           this.DoctorList$ = list;
//         },
//         error: (err) => {
//           console.log(err);
//         }
//       })
//   );
// }

  ngOnDestroy(){
    this.subscriptionList.forEach((sub:Subscription)=>sub.unsubscribe());
  }  

  // getAllVisits(){
  //   this.subscriptionList.push(this.visitSrv.getVisitsList().subscribe({
  //     next:(res:IVisitListModel[])=>{
  //       this.visitList.set(res);
  //     },
  //     error:(err:any)=>{
  //       console.log(err);
  //     }
  //   }));
  // }
}
