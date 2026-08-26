import { inject,Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GlobalConstants } from '../constants/GlobalConstants';
import { IVisitListModel, IVisitModel } from '../models/interfaces/IVisit.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitService {
  http=inject(HttpClient)


  createVisit(obj:IVisitModel){
    return this.http.post(environment.API_URL+GlobalConstants.API_METHODS.CREATE_VISIT,obj)
  }
  getVisitsList():Observable<IVisitListModel[]>{
    return this.http.get<IVisitListModel[]>(environment.API_URL+GlobalConstants.API_METHODS.GET_VISIT)
  }
  getVistbyid(id:number){
    return this.http.get<IVisitListModel>(environment.API_URL+GlobalConstants.API_METHODS.GET_VISIT+id)
  }
}
