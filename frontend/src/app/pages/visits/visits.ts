import { Component, inject, OnInit, signal, WritableSignal, OnDestroy } from '@angular/core';
import { NgClass } from "@angular/common";
import { IPatientListModel } from '../../core/models/interfaces/IPatientList.Model';
import { UserResponseModel } from '../../core/models/interfaces/User.Model';
import { GlobalConstants } from '../../core/constants/GlobalConstants';
import { Observable } from 'rxjs';
import { IVisitListModel } from '../../core/models/interfaces/IVisit.Model';
import { HideShowBtn } from '../../shared/directives/hide-show-btn';
import { RouterLink } from "@angular/router";
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as PatientActions from '../../store/patients/patients.actions';
import * as UserActions from '../../store/users/users.actions';
import * as VisitActions from '../../store/visits/visits.actions';
import { selectPatients } from '../../store/patients/patients.selectors';
import { selectUsers } from '../../store/users/users.selectors';
import { selectVisits } from '../../store/visits/visits.selectors';

@Component({
  selector: 'app-visits',
  imports: [NgClass, HideShowBtn, RouterLink],
  templateUrl: './visits.html',
  styleUrl: './visits.css',
})
export class Visits implements OnInit,OnDestroy{

  isFormOpen=signal(true);
  toggleFormVisibility=()=>{
    this.isFormOpen.set(!this.isFormOpen());
  }

  private store = inject(Store<AppState>);
  patientList$ = this.store.selectSignal(selectPatients);
  DoctorList$ = this.store.selectSignal(selectUsers);
  visitList$ = this.store.selectSignal(selectVisits);
  

  ngOnInit(){
    // this.getAllpatients();
    this.store.dispatch(PatientActions.loadPatients());
    this.store.dispatch(UserActions.filterUsers({ role: String(GlobalConstants.ROLE.DOCTOR) }));
    this.store.dispatch(VisitActions.loadVisits());
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

  ngOnDestroy(){ }
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
