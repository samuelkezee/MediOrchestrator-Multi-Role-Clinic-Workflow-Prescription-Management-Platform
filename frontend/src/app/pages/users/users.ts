import { Component, ElementRef, Inject, inject, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ɵInternalFormsSharedModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store';
import * as UserActions from '../../store/users/users.actions';
import { selectUsers } from '../../store/users/users.selectors';
import { isActive } from '@angular/router';
import { LoginModel } from '../../core/models/class/User.Model';
import { UserResponseModel } from '../../core/models/interfaces/User.Model';
import { NgClass } from '@angular/common';
import { ViewChild } from '@angular/core';
import { Login } from '../login/login';

@Component({
  selector: 'app-users',
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  isFormOpen: boolean = false;
  userForm!: FormGroup;
  private store = inject(Store<AppState>);
  userList = this.store.selectSignal(selectUsers);

  @ViewChild('searchTemp') searchdropDown!:ElementRef;
  loggedUser!:LoginModel;


  constructor(private fb: FormBuilder,
    ) {
      // this.loggedUser=this.usrServ.loggedUserData;  

  }

  ngOnInit(): void {
      // this.loggedUser=this.usrServ.loggedUser();  

    this.initializeForm();
    this.store.dispatch(UserActions.loadUsers());

  }
  initializeForm(): void {

    this.userForm = this.fb.group({
      fullName: ["", Validators.required],
      roleName: ["", Validators.required],
      email: ["", Validators.required, Validators.email],
      mobileNo: ["", Validators.required,],
      password: ["", Validators.required],
      isActive: [true]
    })
  }

  toggleFormVisibility(): void {
    this.isFormOpen = !this.isFormOpen;
  }
  onReset(): void {
    this.userForm.reset({
      fullName: '',
      email: '',
      mobileNo: '',
      password: '',
      isActive: true
    })

  }

  getAllUsers(): void { this.store.dispatch(UserActions.loadUsers()); }

  onResetfilter(){
    this.searchdropDown.nativeElement='';
    this.getAllUsers();
  }



  onSearch() {
  const selectedRole = this.searchdropDown.nativeElement.value;

    this.store.dispatch(UserActions.filterUsers({ role: selectedRole }));
}
 
  onSave(): void {

    // Check form validation
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    // Get form data
    const formValue = this.userForm.value;
    // Call backend
    this.store.dispatch(UserActions.createUser({ user: formValue }));
    this.onReset();
    this.isFormOpen = false;

  }
}