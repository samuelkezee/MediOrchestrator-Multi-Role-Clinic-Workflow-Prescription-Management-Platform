import { Component, inject } from '@angular/core';
import { Userservices } from '../../core/services/userservices';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../core/models/class/User.Model';
import {LoginAPIResponseModel} from '../../core/models/interfaces/User.Model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: LoginModel = new LoginModel();
  loginResponse!:LoginAPIResponseModel;

  userSrv = inject(Userservices);
  router = inject(Router);
  



  Login() {
    debugger;
    this.userSrv.onLogin(this.loginObj).subscribe({
      next: (res:any) => {
        debugger;
        this.loginResponse = res;
        sessionStorage.setItem("hospitalUser", JSON.stringify(res));
        this.router.navigate(["/users"]);
      }, error: (error:any) => {
        debugger;
        alert("Api error" + error.error)
      }
    })

  }


}
