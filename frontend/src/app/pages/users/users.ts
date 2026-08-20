import { Component, Inject, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ɵInternalFormsSharedModule } from '@angular/forms';
import { Userservices } from '../../core/services/userservices';
import { isActive } from '@angular/router';
import { LoginModel } from '../../core/models/class/User.Model';
import { LoginAPIResponseModel } from '../../core/models/interfaces/User.Model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [NgClass,ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  isFormOpen: boolean = false;
  userForm!: FormGroup;
  userList: WritableSignal<LoginAPIResponseModel[]> = signal<LoginAPIResponseModel[]>([])




  constructor(private fb: FormBuilder,
    private usrServ: Userservices) {

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
        console.log(res)
      },
      error: (error: any) => {
        console.log(error)
      }
    })
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