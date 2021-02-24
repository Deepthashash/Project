import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { TaskService } from 'src/app/services/task.service';
import { DeleteComponent } from '../../delete/delete.component';
import { EditTaskComponent } from '../../edit-task/edit-task.component';
import { ViewComponent } from '../view/view.component';

@Component({
  selector: 'app-summary2',
  templateUrl: './summary2.component.html',
  styleUrls: ['./summary2.component.scss']
})
export class Summary2Component implements OnInit {
  tasks = [];
  newList = [];

  constructor(
    private taskservice: TaskService,
    private authService: AuthService,
    private dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    this.taskservice.getAllTasksBlock2().subscribe(
      (res) => {
        this.newList = res;
        console.log(this.newList);
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
        userId1: "-",
        userId2: "-",
        userId3: "-",
        isCompleted: element.isCompleted,
        isApproved: element.isApproved
      }
      
      this.authService.getUser(element.userId1).then(
        (res) => {
          var user = res.firstName + " " + res.lastName;
          temp.userId1 = user;
        }
      );
      
      if(element.userId2 != ""){
        this.authService.getUser(element.userId2).then(
          (res) => {
            var user = res.firstName + " " + res.lastName;
            temp.userId2 = user;
          }
        );
      }

      if(element.userId3 != ""){
        this.authService.getUser(element.userId3).then(
          (res) => {
            var user = res.firstName + " " + res.lastName;
            temp.userId3 = user;
          }
        );
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

  delete(id){
    var type = "task";
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
    this.dialog.open(EditTaskComponent, dialogConfig);
  }

}
