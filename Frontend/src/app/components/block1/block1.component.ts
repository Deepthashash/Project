import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { File } from 'src/app/models/file.model';
import { Comments } from 'src/app/models/comments.model';
import { TaskService } from 'src/app/services/task.service';
import { CommentsService } from 'src/app/services/comments.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { ViewComponent } from '../tasks/view/view.component';
import { Validators, FormBuilder } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-block1',
  templateUrl: './block1.component.html',
  styleUrls: ['./block1.component.scss']
})
export class Block1Component implements OnInit {

  CommentsForm = this.formBuilder.group({
    comment: ['', [Validators.required]],
  });

  constructor(
    private formBuilder: FormBuilder,
    private taskservice: TaskService,
    private commentService: CommentsService,
    private authService: AuthService,
    private fileService: FileUploadService,
    private dialog: MatDialog
    ) { }

  tasks = [];
  onGoing = [];
  completed = [];
  files = [];
  drawings = [];
  rfi = [];
  other = [];
  user: User;

  showDetails(id){
        var isBlock = true;
        var isAdmin = false;
        const dialogConfig = new MatDialogConfig();
        dialogConfig.autoFocus = true;
        dialogConfig.width = "50%";
        dialogConfig.data ={id,isBlock,isAdmin}
        this.dialog.open(ViewComponent, dialogConfig);
  }

  ngOnInit(): void {
    this.taskservice.getAllTasksBlock1().subscribe(
      (result) => {
        this.tasks = result;
        console.log(this.tasks);
        this.separate(this.tasks);
      },
      (error) => {

      }
    )
    this.fileService.getAllFilesBlock1().subscribe(
      (res) => {
        this.files = res;
        this.change(this.files);
      },
      (err) => {

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

  change(files: File[]){
    files.forEach(element => {
      if(element.category === "Drawings"){
        this.drawings.push(element);
      }else if(element.category === "rfi"){
        this.rfi.push(element);
      }else{
        this.other.push(element);
      }
    })
  }

  submit(formData: Comments){
    this.user = this.authService.getCurrentUser();
    this.commentService.postComment({...formData, userId: this.user._id, blockName: "block1"}).then(
      (result)=>{
        console.log(result);
        location.reload();
      },
      (err) => {
        console.log(err);
      }
    )
  }

}
