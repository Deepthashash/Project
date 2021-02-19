import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TaskService } from "../../../services/task.service"

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  users = [];
  blocks = ["block1","block2","block3"]

  TaskAddForm = this.formBuilder.group({
    taskName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    userId1: ['', [Validators.required]],
    userId2: [''],
    userId3: [''],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    block: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddComponent>
    ) { }

  ngOnInit(): void {
    this.authService.getAllUsers().then(
      (results) => {
        this.users = results;
      },
      (err) => {

      }
    )
  }

  getUsers(){
    
    return [
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
      { id: '3', name: 'User 3' },
      { id: '4', name: 'User 4' }
    ];
  }

  submit(formData){
    const formDetails = {
      ...formData,
      startDate: new Date(formData.startDate).getTime(),
      endDate: new Date(formData.endDate).getTime(),      
      isCompleted: false,
      isApproved: false
    }
    console.log(formDetails);
    this.taskService.postTask(formDetails).then(
      (res) => {
        console.log("Success");
        var notification = {
          _id: "",
          taskId: res._id,
          isSeen: false,
          title: "New Task",
          userId: formDetails.userId1  
        } 
        this.notificationService.postNotification(notification).then(
          (res) => {
            console.log(res);
          }

        );
        if(formDetails.userId2 != ""){
          notification.userId = formDetails.userId2;
          this.notificationService.postNotification(notification).then(
            (res) => {
              console.log(res);
            }
  
          );
        }
        if(formDetails.userId3 != ""){
          notification.userId = formDetails.userId3;
          this.notificationService.postNotification(notification).then(
            (res) => {
              console.log(res);
            }
  
          );
        }
        location.reload();
      },
      (err) => {

      }
    );
  }

  close(){
    this.dialogRef.close();
  }
}
