import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../core/models/class/User.Model';
import { Store } from '@ngrx/store';
import * as AuthActions from '../../store/auth/auth.actions';
import { AppState } from '../../store';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: LoginModel = new LoginModel();
  private store = inject(Store<AppState>);


  // Login() {
  //   this.userSrv.onLogin(this.loginObj).subscribe({
  //     next: (res: any) => {
  //       this.loginResponse = res;
  //       sessionStorage.setItem(GlobalConstants.LOGGED_USER_SESSION_NAME, JSON.stringify(res));

  //       // Save token if returned by API
  //       const token = res.token || res.data?.token || res.jwtToken || res.accessToken;
  //       if (token) {
  //         sessionStorage.setItem(GlobalConstants.TOKEN_SESSION_NAME, token);
  //       }
  //       this.userSrv.assignLoggedUser();
  //       this.router.navigate(["/users"]);
  //     },
  //     error: (error: any) => {
  //       alert("Api error: " + (error?.error?.message || error?.error || error?.message || "Login failed"));
  //     }
  //   });
  // }
  Login() {
    this.store.dispatch(AuthActions.login({ credentials: this.loginObj }));
  }

  logout(){
    this.store.dispatch(AuthActions.logout());
  }

}
