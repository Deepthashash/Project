import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ViewComponent } from '../tasks/view/view.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService:AuthService, 
    private taskservice:TaskService,
    private notificationService:NotificationService,
    private dialog: MatDialog    
    ) {}

  user: User;

  tasks = [];
  onGoing = [];
  completed = [];
  notifications = [];

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.taskservice.getAllTasksPerUser(this.user._id).then(
      (result) => {
        this.tasks = result;
        console.log(this.tasks);
        this.separate(this.tasks);
      },
      (error) => {

      }
    );
    this.notificationService.getAllNotificationsPerUser(this.user._id).then(
      (res) => {
        this.notifications = res;
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
    var isAdmin = false;
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
}
