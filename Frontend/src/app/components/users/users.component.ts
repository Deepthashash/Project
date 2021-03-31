import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { DeleteComponent } from '../delete/delete.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'users-summary',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users = [];

  constructor(
    private taskservice: TaskService,
    private authService: AuthService,
    private dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    this.authService.getAllUsers().then(
      (res) => {
        this.users = res;
      }
    )
  }

  approve(id){
    this.taskservice.updateAsApproved(id).then(
      (res) => {
        location.reload();
      }
    )
  }

  checkStatus(task){
    if(task.isCompleted){
      if(!task.isApproved) return false
      else return true;
    }else return true;
  }

  delete(id){
    var type = "user";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    // dialogConfig.width = "50%";
    dialogConfig.data ={id,type}
    this.dialog.open(DeleteComponent, dialogConfig);
  }

  edit(id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data ={id}
    this.dialog.open(EditUserComponent, dialogConfig);
  }

}
