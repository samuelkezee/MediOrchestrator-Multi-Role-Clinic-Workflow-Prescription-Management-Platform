// import { HttpClient } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { environment } from '../../../environments/environment';
// import { LoginModel, userModel } from '../models/class/User.Model';
// import { GlobalConstants } from '../constants/GlobalConstants';
// import { LoginAPIResponseModel } from '../models/interfaces/User.Model';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class Userservices {
//   http = inject(HttpClient);
//   loggedUserData!:LoginModel;

//   constructor(){
//     this.assignLoggedUser();
//   }


//   assignLoggedUser(){
//     const loggedUser=sessionStorage.getItem('hospitalUser')
//     if(loggedUser){
//       this.loggedUserData=JSON.parse(loggedUser)
//     }
//   }
  

//   onLogin(loginObj: LoginModel): Observable<LoginAPIResponseModel> {
//     return this.http.post<LoginAPIResponseModel>(environment.API_URL + GlobalConstants.API_METHODS.LOGIN, loginObj)
//   }

//   onCreateUser(userObj: userModel): Observable<LoginAPIResponseModel> {
//     return this.http.post<LoginAPIResponseModel>(environment.API_URL + GlobalConstants.API_METHODS.CREATE_USER, userObj)
//   }

//   getAllUsers(): Observable<LoginAPIResponseModel[]> {
//     return this.http.get<LoginAPIResponseModel[]>(environment.API_URL + GlobalConstants.API_METHODS.GETALLUSERS)
//   }

//   filterUsers(searchText: string): Observable<LoginAPIResponseModel[]> {
//   return this.http.get<LoginAPIResponseModel[]>(
//     environment.API_URL +
//     GlobalConstants.API_METHODS.GETALLUSERS +
//     '?roleName=' + searchText
//   );
// }

//   onGetUserById(id: number) {
//     return this.http.get(environment.API_URL + GlobalConstants.API_METHODS.GETUSERBYID + id)
//   }

//   onUpdateUser(userObj: userModel) {
//     return this.http.put(environment.API_URL + GlobalConstants.API_METHODS.UPDATEUSER, userObj)
//   }

//   getToken(): string | null {
//     const token = sessionStorage.getItem('token') || localStorage.getItem('token');
//     if (token) return token;

//     const userData = sessionStorage.getItem('hospitalUser') || localStorage.getItem('hospitalUser');
//     if (userData) {
//       try {
//         const parsed = JSON.parse(userData);
//         return parsed.token || parsed.data?.token || parsed.jwtToken || null;
//       } catch {
//         return null;
//       }
//     }
//     return null;
//   }

//   getLoggedUser(): LoginAPIResponseModel | null {
//     const userData = sessionStorage.getItem('hospitalUser') || localStorage.getItem('hospitalUser');
//     if (userData) {
//       try {
//         return JSON.parse(userData);
//       } catch {
//         return null;
//       }
//     }
//     return null;
//   }

//   isLoggedIn(): boolean {
//   return !!(this.getToken() || this.getLoggedUser());
// }

//   logout(): void {
//     sessionStorage.removeItem('hospitalUser');
//     sessionStorage.removeItem('token');
//     localStorage.removeItem('token');
//   }
// }
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginModel, userModel } from '../models/class/User.Model';
import { GlobalConstants } from '../constants/GlobalConstants';
import { LoginAPIResponseModel, UserResponseModel } from '../models/interfaces/User.Model';
import { Observable, timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class Userservices {
  http = inject(HttpClient);

  // single reactive source of truth
  private _loggedUser = signal<UserResponseModel | null>(this.readFromStorage());
  readonly loggedUser = this._loggedUser.asReadonly(); // any component/service can read this reactively


  loginTimeoutInterval=timer(5*60*1000);

  constructor() {}

  private readFromStorage(): UserResponseModel | null {
    const raw = sessionStorage.getItem(GlobalConstants.LOGGED_USER_SESSION_NAME)
             || localStorage.getItem(GlobalConstants.LOGGED_USER_SESSION_NAME);
    if (!raw) return null;
    try {
      const parsed = JSON.parse(raw);
      return parsed.user ?? parsed;
    } catch { return null; }
  }

  onLogin(loginObj: LoginModel): Observable<LoginAPIResponseModel> {
    return this.http.post<LoginAPIResponseModel>(environment.API_URL + GlobalConstants.API_METHODS.LOGIN, loginObj);
  }

  onCreateUser(userObj: userModel): Observable<UserResponseModel> {
    return this.http.post<UserResponseModel>(environment.API_URL + GlobalConstants.API_METHODS.CREATE_USER, userObj);
  }

  getAllUsers(): Observable<UserResponseModel[]> {
    return this.http.get<UserResponseModel[]>(environment.API_URL + GlobalConstants.API_METHODS.GETALLUSERS);
  }

  // called ONCE, right after a successful login response — this is the only place that writes storage
  setLoggedUser(res: LoginAPIResponseModel): void {
    sessionStorage.setItem(GlobalConstants.LOGGED_USER_SESSION_NAME, JSON.stringify(res.user));
    const token = res.token;
    if (token) sessionStorage.setItem(GlobalConstants.TOKEN_SESSION_NAME, token);
    this._loggedUser.set(res.user);
  }

  getToken(): string | null {
    return sessionStorage.getItem(GlobalConstants.TOKEN_SESSION_NAME)
        || localStorage.getItem(GlobalConstants.TOKEN_SESSION_NAME)
        || this._loggedUser()?.token
        || null;
  }

  getLoggedUser(): UserResponseModel | null {
    return this._loggedUser();
  }

  isLoggedIn(): boolean {
    return !!this._loggedUser() && !!this.getToken(); // fixed: no longer inverted
  }

  logout(): void {
    sessionStorage.removeItem(GlobalConstants.LOGGED_USER_SESSION_NAME);
    sessionStorage.removeItem(GlobalConstants.TOKEN_SESSION_NAME);
    localStorage.removeItem(GlobalConstants.TOKEN_SESSION_NAME);
    this._loggedUser.set(null);
  }
  filterUsers(searchText: string): Observable<UserResponseModel[]> {
  return this.http.get<UserResponseModel[]>(
    environment.API_URL +
    GlobalConstants.API_METHODS.GETALLUSERS +
    '?roleName=' + searchText
  );
}
}