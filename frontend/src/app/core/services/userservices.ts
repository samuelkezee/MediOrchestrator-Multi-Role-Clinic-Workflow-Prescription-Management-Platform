import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { LoginModel, userModel } from '../models/class/User.Model';
import { GlobalConstants } from '../constants/GlobalConstants';
import { LoginAPIResponseModel } from '../models/interfaces/User.Model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Userservices {
  http = inject(HttpClient);
  loggedUserData!:LoginModel;

  constructor(){
    this.assignLoggedUser();
  }


  assignLoggedUser(){
    const loggedUser=sessionStorage.getItem('hospitalUser')
    if(loggedUser){
      this.loggedUserData=JSON.parse(loggedUser)
    }
  }
  

  onLogin(loginObj: LoginModel): Observable<LoginAPIResponseModel> {
    return this.http.post<LoginAPIResponseModel>(environment.API_URL + GlobalConstants.API_METHODS.LOGIN, loginObj)
  }

  onCreateUser(userObj: userModel): Observable<LoginAPIResponseModel> {
    return this.http.post<LoginAPIResponseModel>(environment.API_URL + GlobalConstants.API_METHODS.CREATE_USER, userObj)
  }

  getAllUsers(): Observable<LoginAPIResponseModel[]> {
    return this.http.get<LoginAPIResponseModel[]>(environment.API_URL + GlobalConstants.API_METHODS.GETALLUSERS)
  }

  filterUsers(searchText: string): Observable<LoginAPIResponseModel[]> {
    return this.http.get<LoginAPIResponseModel[]>(environment.API_URL + GlobalConstants.API_METHODS.GETALLUSERS + searchText)
  }

  onGetUserById(id: number) {
    return this.http.get(environment.API_URL + GlobalConstants.API_METHODS.GETUSERBYID + id)
  }

  onUpdateUser(userObj: userModel) {
    return this.http.put(environment.API_URL + GlobalConstants.API_METHODS.UPDATEUSER, userObj)
  }

  getToken(): string | null {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (token) return token;

    const userData = sessionStorage.getItem('hospitalUser') || localStorage.getItem('hospitalUser');
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        return parsed.token || parsed.data?.token || parsed.jwtToken || null;
      } catch {
        return null;
      }
    }
    return null;
  }

  getLoggedUser(): LoginAPIResponseModel | null {
    const userData = sessionStorage.getItem('hospitalUser') || localStorage.getItem('hospitalUser');
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch {
        return null;
      }
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !(this.getToken() || this.getLoggedUser());
  }

  logout(): void {
    sessionStorage.removeItem('hospitalUser');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
  }
}

