import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { NotificationService } from 'src/app/services/notification.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  id: string;
  task: any;
  startDate: any;
  endDate: any;
  isBlock: boolean;
  isAdmin: boolean;
  other: boolean;
  admin: boolean;
  isComplete: boolean;

  constructor(
    private taskService: TaskService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
      this.isBlock = data.isBlock;
      this.isAdmin = data.isAdmin
    }
  

  ngOnInit(): void {
    this.taskService.getTaskById(this.id).then(
      (res) => {
        this.task = res;
        this.startDate = new Date(res.startDate).toLocaleTimeString()+ "  " + new Date(res.startDate).toLocaleDateString();
        this.endDate = new Date(res.endDate).toLocaleTimeString()+ "  " + new Date(res.endDate).toLocaleDateString();
        this.setStatus();
      },
      (err) => {

      }
    )
  }

  setStatus(){
    console.log(this.isBlock);
    console.log(this.isAdmin);
    console.log(this.task.isCompleted);
    if(this.isBlock){
      this.admin = false;
      this.other = false;
    }else if(this.isAdmin){
      this.admin = true;
      this.other = false; 
    }else{
      if(this.task.isCompleted){
        this.admin = false;
        this.other = false; 
      }else{
        this.admin = false;
        this.other = true; 
      }
    }
  }

  close(){
    this.dialogRef.close();
  }

  update(){
    this.taskService.updateAsCompleted(this.id).then(
      (res) => {
        console.log(res);
        var notification = {
          _id: "",
          taskId: this.id,
          isSeen: false,
          title: "Pending Approval",
          userId: "admin",
          type: "task"  
        } 
        this.notificationService.postNotification(notification).then(
          (res) => {
            console.log(res);
          });        
        location.reload();
      },
      (err) => {

      }
    )
  }

  updateAsApproved(){
    this.taskService.updateAsApproved(this.id).then(
      (res) => {
        console.log(res); 
        location.reload();
      },
      (err) => {

      }
    )
  }

}
