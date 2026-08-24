import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicineModel } from '../models/interfaces/Medicine.Model';
import { environment } from '../../../environments/environment';
import { GlobalConstants } from '../constants/GlobalConstants';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicineService {
  private http = inject(HttpClient);

  getAllMedicine(): Observable<MedicineModel[]> {
    return this.http.get<MedicineModel[]>(environment.API_URL + GlobalConstants.API_METHODS.GETALLMEDICINE);
  }

  createMedicine(medicineObj: MedicineModel): Observable<any> {
    return this.http.post<any>(environment.API_URL + GlobalConstants.API_METHODS.CREATE_MEDICINE, medicineObj);
  }

  updateMedicine(medicineObj: MedicineModel): Observable<any> {
    return this.http.put<any>(environment.API_URL + GlobalConstants.API_METHODS.UPDATE_MEDICINE, medicineObj);
  }

  deleteMedicine(id: number): Observable<any> {
    return this.http.delete<any>(environment.API_URL + GlobalConstants.API_METHODS.DELETE_MEDICINE + id);
  }

  getMedicineById(id: number): Observable<MedicineModel> {
    return this.http.get<MedicineModel>(environment.API_URL + GlobalConstants.API_METHODS.GET_MEDICINE_BY_ID + id);
  }
}
