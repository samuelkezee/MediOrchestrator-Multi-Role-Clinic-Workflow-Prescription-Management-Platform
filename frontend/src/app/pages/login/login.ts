import { Component, inject } from '@angular/core';
import { Userservices } from '../../core/services/userservices';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from '../../core/models/class/User.Model';
import { LoginAPIResponseModel } from '../../core/models/interfaces/User.Model';
import { GlobalConstants } from '../../core/constants/GlobalConstants';
import { AppState } from '../../store';
import { Store } from '@ngrx/store';
import * as AuthActions from "../../store/auth/auth.actions"

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObj: LoginModel = new LoginModel();
  private store=inject(Store<AppState>)

  Login() {
    this.store.dispatch(AuthActions.login({credentials:this.loginObj}));
  }
  logout(){
    this.store.dispatch(AuthActions.logout());
  }

}

