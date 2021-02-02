import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
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


  constructor(
    private taskService: TaskService,
    private dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
      this.isBlock = data.isBlock;
    }
  

  ngOnInit(): void {
    this.taskService.getTaskById(this.id).then(
      (res) => {
        this.task = res;
        this.startDate = new Date(res.startDate).toLocaleTimeString()+ "  " + new Date(res.endDate).toLocaleDateString();
        this.endDate = new Date(res.startDate).toLocaleTimeString()+ "  " + new Date(res.endDate).toLocaleDateString();
      },
      (err) => {

      }
    )
  }

  close(){
    this.dialogRef.close();
  }

  update(){
    this.taskService.updateAsCompleted(this.id).then(
      (res) => {
        console.log(res)
      },
      (err) => {

      }
    )
  }

}
