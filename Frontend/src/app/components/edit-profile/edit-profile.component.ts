import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  errorMessage = 'temp';
  successMessage = 'temp';
  types = ["Engineer","ProjectManager","Supervisor"]
  user: User;

  RegisterForm = this.formBuilder.group({
    profilePicture: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    mobileNumber: ['',Validators.required],
    // email: ['', [Validators.required, Validators.email]],
    // password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditProfileComponent>) { }

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();

    this.RegisterForm.controls.profilePicture.setValue(this.user.profilePicture);
    this.RegisterForm.controls.firstName.setValue(this.user.firstName);
    this.RegisterForm.controls.lastName.setValue(this.user.lastName);
    this.RegisterForm.controls.mobileNumber.setValue(this.user.mobileNumber);
  }

  setProfilePicture(url): void {
    this.RegisterForm.controls.profilePicture.setValue(url);
    console.log('profile picture is : ' + url);
  }

  updateUser(newData: User): void {
    console.log(newData);
    this.authService.updateUser(this.user._id,newData).then(
      (res) => {
        // this.toastr.success('', 'Updated Successfully');
        localStorage.setItem('currentUser', JSON.stringify(res));
        location.reload();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
