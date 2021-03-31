import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  errorMessage = 'temp';
  successMessage = 'temp';
  types = ["Engineer","ProjectManager","Supervisor"]
  user: User;
  id:string;

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
    private dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
    }

  ngOnInit(): void {
    this.authService.getUser(this.id).then(
      (res) => {
        this.user = res;
        this.RegisterForm.controls.profilePicture.setValue(this.user.profilePicture);
        this.RegisterForm.controls.firstName.setValue(this.user.firstName);
        this.RegisterForm.controls.lastName.setValue(this.user.lastName);
        this.RegisterForm.controls.mobileNumber.setValue(this.user.mobileNumber);
      }
    )

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
        location.reload();
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
