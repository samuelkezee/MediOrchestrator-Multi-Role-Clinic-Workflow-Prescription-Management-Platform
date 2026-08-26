import { Component, ElementRef, Inject, inject, OnInit, signal, viewChild, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ɵInternalFormsSharedModule } from '@angular/forms';
import { Userservices } from '../../core/services/userservices';
import { isActive } from '@angular/router';
import { LoginModel } from '../../core/models/class/User.Model';
import { LoginAPIResponseModel } from '../../core/models/interfaces/User.Model';
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
  userList: WritableSignal<LoginAPIResponseModel[]> = signal<LoginAPIResponseModel[]>([]);

  @ViewChild('searchTemp') searchdropDown!:ElementRef;
  loggedUser!:LoginModel;


  constructor(private fb: FormBuilder,
    private usrServ: Userservices) {
      this.loggedUser=this.usrServ.loggedUserData;  

  }

  ngOnInit(): void {
    this.initializeForm();
    this.getAllUsers();

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

  getAllUsers(): void {
    this.usrServ.getAllUsers().subscribe({
      next: (res: LoginAPIResponseModel[]) => {
        console.log('[getAllUsers] Raw API Response:', res);
        // Handle both direct array and wrapped responses (res.data or res)
        const list = res;
        console.log('[getAllUsers] Parsed user list length:', list.length, list);
        this.userList.set(list);
      },
      error: (error: any) => {
        console.error('[getAllUsers] API Error:', error);
      }
    });
  }

  onResetfilter(){
    this.searchdropDown.nativeElement='';
    this.getAllUsers();
  }



  onSearch() {
  const selectedRole = this.searchdropDown.nativeElement.value;

  this.usrServ.filterUsers(selectedRole).subscribe({
    next: (res: LoginAPIResponseModel[]) => {
      console.log('[filterUsers] Raw API Response:', res);
      // Handle both direct array and wrapped responses (res.data or res)
      const list = res;
      console.log('[filterUsers] Parsed user list length:', list.length, list);
      this.userList.set(list);
    },
    error: (error: any) => {
      console.error('[filterUsers] API Error:', error);
    }
  });
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
    this.usrServ.onCreateUser(formValue).subscribe({
      next: (response: any) => {
        alert('User Created Successfully');
        // Refresh user list
        this.getAllUsers();
        // Reset form
        this.onReset();

        // Close form
        this.isFormOpen = false;

      },

      error: (error: any) => {
        console.log(error);

      }

    });

  }
}