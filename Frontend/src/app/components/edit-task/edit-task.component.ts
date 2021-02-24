import { getLocaleDateTimeFormat } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TaskService } from 'src/app/services/task.service';
import { AddComponent } from '../tasks/add/add.component';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  id:string;
  users = [];
  blocks = [
    {id:"block1", name: "Block1"},
    {id:"block2", name: "Block2"},
    {id:"block3", name: "Block3"},
  ]

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
    private dialogRef: MatDialogRef<AddComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
    }

  ngOnInit(): void {
    this.authService.getAllUsers().then(
      (results) => {
        this.users = results;
      },
      (err) => {

      }
    )
    this.taskService.getTaskById(this.id).then(
      (res) => {

        this.TaskAddForm.controls.taskName.setValue(res.taskName);
        this.TaskAddForm.controls.description.setValue(res.description);
        this.TaskAddForm.controls.userId1.setValue(res.userId1);
        this.TaskAddForm.controls.userId2.setValue(res.userId2);
        this.TaskAddForm.controls.userId3.setValue(res.userId3);
        this.TaskAddForm.controls.startDate.setValue(res.startDate);
        this.TaskAddForm.controls.endDate.setValue(new Date(res.startDate));
        this.TaskAddForm.controls.block.setValue(res.block); 
      }
    )  

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
          userId: formDetails.userId1,
          type: "task"  
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
