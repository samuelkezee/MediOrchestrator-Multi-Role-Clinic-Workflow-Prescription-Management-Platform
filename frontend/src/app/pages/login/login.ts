import { Component, inject } from '@angular/core';
import { Userservices } from '../../core/services/userservices';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../core/models/class/User.Model';
import { LoginAPIResponseModel } from '../../core/models/interfaces/User.Model';
import { GlobalConstants } from '../../core/constants/GlobalConstants';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: LoginModel = new LoginModel();
  loginResponse!: LoginAPIResponseModel;

  userSrv = inject(Userservices);
  router = inject(Router);




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
  this.userSrv.onLogin(this.loginObj).subscribe({
    next: (res: LoginAPIResponseModel) => {
      this.userSrv.setLoggedUser(res);
      this.router.navigate(['/users']);
    },
    error: (error: any) => {
      alert('Api error: ' + (error?.error?.message || error?.error || error?.message || 'Login failed'));
    }
  });
}


}
