import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  tasks = [];
  newList = [];
  constructor(
    private taskservice: TaskService
  ) { }

  ngOnInit(): void {
    this.taskservice.getAllTasks().subscribe(
      (res) => {
        this.newList = res;
        this.change(this.newList);
      }
    )
  }

  change(tasks: Task[]){
    tasks.forEach(element => {
      var temp = {
        _id: element._id,
        taskName: element.taskName,
        description: element.description,
        startDate: new Date(element.startDate).toLocaleDateString(),
        endDate: new Date(element.endDate).toLocaleDateString(),
        userId: element.userId,
        isCompleted: element.isCompleted,
        isApproved: element.isApproved
      }
      this.tasks.push(temp);
    });
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

}
