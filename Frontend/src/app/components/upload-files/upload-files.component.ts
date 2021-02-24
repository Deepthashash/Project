import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { RegisterUserComponent } from '../register-user/register-user.component';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  errorMessage = 'temp';
  successMessage = 'temp';
  categories = ["Structural Drawings","Architectural Drawings","R/F Drawings","MEP Drawings","Site Instructions","Method Statement","Any Other"];
  blocks = ["Block1","Block2","Block3"];

  FileUploadForm = this.formBuilder.group({
    file: ['', Validators.required],
    fileName: ['', Validators.required],
    block: ['', Validators.required],
    category: ['',Validators.required]
  });
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private fileService: FileUploadService,
    private dialogRef: MatDialogRef<UploadFilesComponent>) { }

  ngOnInit(): void {
  }

  setProfilePicture(url): void {
    this.FileUploadForm.controls.file.setValue(url);
    console.log('file is : ' + url);
  }

  upload(formData): void {
    this.fileService
      .postFile({...formData, })
      .then(
        (res) => {
          // this.toastr.success('Login now', 'Registered Successfully');
          

          // this.router.navigate(['/login']);
          this.FileUploadForm.reset();
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
