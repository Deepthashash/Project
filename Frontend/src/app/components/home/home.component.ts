import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EventEmitterService } from 'src/app/services/event-emitter.service';
import { TaskService } from 'src/app/services/task.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { ViewComponent } from '../tasks/view/view.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private taskService: TaskService,private router: Router, 
    private dialog: MatDialog) { }

  percentage_block1 = 0;
  percentage_block2 = 0;
  percentage_block3 = 0;

  tasks = [];
  tasks1 = [];
  tasks2 = [];
  tasks3 = []; 

  ngOnInit(): void { 
    this.taskService.getAllTasks().subscribe(
      (res) => {
        this.tasks = res;
      }
    )

    this.taskService.getAllTasksBlock1().subscribe(
      (res) => {
        this.tasks1 = res;
        var count = 0;
        this.tasks1.forEach(element => {
          if(element.isApproved){
            count ++;
          }
        })
        this.percentage_block1 = (count/this.tasks1.length) * 100;
      }
    )
    this.taskService.getAllTasksBlock2().subscribe(
      (res) => {
        this.tasks2 = res;
        var count = 0;
        this.tasks2.forEach(element => {
          if(element.isApproved){
            count ++;
          }
        })
        this.percentage_block2 = (count/this.tasks2.length) * 100;
      }
    )
    this.taskService.getAllTasksBlock3().subscribe(
      (res) => {
        this.tasks3 = res;
        var count = 0;
        this.tasks3.forEach(element => {
          if(element.isApproved){
            count ++;
          }
        })
        this.percentage_block3 = (count/this.tasks3.length) * 100;
      }
    )
  }

  images = [
    {path: '../../../assets/images/construction-site-1.jpg'},
    {path: '../../../assets/images/construction-site-2.jpg'},
    {path: '../../../assets/images/construction-site-3.jpg'}
  ]

  open(id:string){
    var isBlock = true;
    var isAdmin = false;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data ={id,isBlock,isAdmin}
    this.dialog.open(ViewComponent, dialogConfig);
  }

  navigate(num){
    if(num == 1){
      this.router.navigate(['/block1']);
    }else if(num == 2){
      this.router.navigate(['/block2']);
    }else{
      this.router.navigate(['/block3']);
    }
  }

}
