import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ViewComponent } from '../tasks/view/view.component';

@Component({
  selector: 'app-block1',
  templateUrl: './block1.component.html',
  styleUrls: ['./block1.component.scss']
})
export class Block1Component implements OnInit {

  constructor(
    private taskservice: TaskService,
    private dialog: MatDialog
    ) { }
  tasks = [];
  onGoing = [];
  completed = [];

  showDetails(id){
        var isBlock = true;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = "50%";
        dialogConfig.data ={id,isBlock}
        this.dialog.open(ViewComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.taskservice.getAllTasks().subscribe(
      (result) => {
        this.tasks = result;
        console.log(this.tasks);
        this.separate(this.tasks);
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

}
