import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import { TaskService } from "../../../services/task.service"

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  orders = [];

  TaskAddForm = this.formBuilder.group({
    taskName: ['', [Validators.required]],
    description: ['', [Validators.required]],
    userId: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private dialogRef: MatDialogRef<AddComponent>
    ) { }

  ngOnInit(): void {
    this.orders = this.getUsers();
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
