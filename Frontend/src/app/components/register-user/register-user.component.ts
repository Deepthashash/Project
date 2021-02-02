import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  errorMessage = 'temp';
  successMessage = 'temp';
  types = ["Engineer","ProjectManager","Supervisor"]

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
    private dialogRef: MatDialogRef<RegisterUserComponent>) { }

  ngOnInit(): void {
  }

  setProfilePicture(url): void {
    this.RegisterForm.controls.profilePicture.setValue(url);
    console.log('profile picture is : ' + url);
  }

}
