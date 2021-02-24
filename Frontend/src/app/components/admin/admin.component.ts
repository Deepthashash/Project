import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { AddComponent } from '../tasks/add/add.component';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { ViewComponent } from '../tasks/view/view.component';
import { UploadFilesComponent } from '../upload-files/upload-files.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService:AuthService, 
    private taskservice:TaskService,
    private router:Router,
    private dialog: MatDialog    
    ) {}

  user: User;

  tasks = [];
  onGoing = [];
  completed = [];

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.taskservice.getUnapprovedTasks().then(
      (result) => {
        this.onGoing = result;
      },
      (error) => {

      }
    )
  }

  separate(tasks: Task[]){
    tasks.forEach(element => {
      if(element.isApproved){
        this.completed.push(element);
      }else{
        this.onGoing.push(element);
      }
    })
  }


  showDetails(id){
    var isBlock = false;
    var isAdmin = true;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data ={id,isBlock,isAdmin}
    this.dialog.open(ViewComponent, dialogConfig);
  }
  openEditProfile() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(EditProfileComponent, dialogConfig);
  }
  openAddTask() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(AddComponent, dialogConfig);
  }

  openUploadFile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(UploadFilesComponent, dialogConfig);
  }

  openRegister() {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    this.dialog.open(RegisterUserComponent, dialogConfig);
  }

  navigate(num){
    if(num == 1){
      this.router.navigate(['/block1Summary']);
    }else if(num == 2){
      this.router.navigate(['/block2Summary']);
    }else{
      this.router.navigate(['/block3Summary']);
    }
  }

}
