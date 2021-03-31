import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  errorMessage = 'temp';
  successMessage = 'temp';
  types = ["Project Manager(Admin)","Technical Supervisor(Admin)","Stakeholder","Consultant","Site Engineer","Site Engineer","Site Contractor"]

  RegisterForm = this.formBuilder.group({
    profilePicture: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobileNumber: ['',Validators.required],
    email: ['', [Validators.required, Validators.email]],
    userType: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<RegisterUserComponent>) { }

  ngOnInit(): void {
  }

  setProfilePicture(url): void {
    this.RegisterForm.controls.profilePicture.setValue(url);
    console.log('profile picture is : ' + url);
  }

  tryRegister(formData): void {
    this.authService
      .register(formData)
      .subscribe(
        (res) => {
          // this.toastr.success('Login now', 'Registered Successfully');
          

          // this.router.navigate(['/login']);
          this.RegisterForm.reset();
        },
        (err) => {
          this.errorMessage = err.error[0];
          console.log(err.error[0]);
        }
      );
  }

  close(){
    this.dialogRef.close();
  }

}
