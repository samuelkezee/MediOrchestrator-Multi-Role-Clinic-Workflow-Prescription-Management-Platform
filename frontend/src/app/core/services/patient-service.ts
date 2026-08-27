import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PatientModel } from '../models/class/Patient.Model';
import { IPatientListModel } from '../models/interfaces/IPatientList.Model';
import { environment } from '../../../environments/environment';
import { GlobalConstants } from '../constants/GlobalConstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  http = inject(HttpClient);

  createNewpatient(obj:PatientModel):Observable<IPatientListModel>{
    return this.http.post<IPatientListModel>(environment.API_URL+GlobalConstants.API_METHODS.GET_PATIENT, obj)
  }

  getAllPatients():Observable<IPatientListModel[]>{
    return this.http.get<IPatientListModel[]>(environment.API_URL+GlobalConstants.API_METHODS.GET_PATIENT)
  }

  getPatientByPId(pId:number):Observable<IPatientListModel>{
    return this.http.get<IPatientListModel>(environment.API_URL+GlobalConstants.API_METHODS.GET_PATIENT_BY_ID+`${pId}`)
  }
}
