import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginModel, userModel } from '../models/class/User.Model';
import { GlobalConstants } from '../constants/GlobalConstants';
import { LoginAPIResponseModel } from '../models/interfaces/User.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userservices {
  http=inject(HttpClient);

  onLogin(loginObj:LoginModel):Observable<LoginAPIResponseModel>{
  return this.http.post<LoginAPIResponseModel>(environment.API_URL +GlobalConstants.API_METHODS.LOGIN, loginObj)
  }

  onCreateUser(userObj:userModel):Observable<LoginAPIResponseModel>{
    return this.http.post<LoginAPIResponseModel>(environment.API_URL +GlobalConstants.API_METHODS.CREATE_USER, userObj)
  }

  getAllUsers():Observable<LoginAPIResponseModel[]>{
    return this.http.get<LoginAPIResponseModel[]>(environment.API_URL +GlobalConstants.API_METHODS.GETALLUSERS)
  }

  

  onGetUserById(id:number){
    return this.http.get(environment.API_URL +GlobalConstants.API_METHODS.GETUSERBYID + id)
  }

  onUpdateUser(userObj:userModel){
    return this.http.put(environment.API_URL +GlobalConstants.API_METHODS.UPDATEUSER, userObj)
  }
}
