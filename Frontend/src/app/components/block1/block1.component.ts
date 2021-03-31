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
import { AddCommentComponent } from '../comments/add-comment/add-comment.component';
import { ViewCommentComponent } from '../comments/view-comment/view-comment.component';

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
  comments = [];
  
  files = [];
  structural_Drawings = [];
  architectural_Drawings = [];
  rf_Drawings = [];
  mep_Drawings = [];
  other = [];
  site_Instructions = [];
  method_Statement = [];

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

  showComment(id){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data ={id}
    this.dialog.open(ViewCommentComponent, dialogConfig);
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
    this.commentService.getAllCommentsBlock1().subscribe(
      (res) => {
        this.comments = res;
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
      if(element.category === "Structural Drawings"){
        this.structural_Drawings.push(element);
      }else if(element.category === "Architectural Drawings"){
        this.architectural_Drawings.push(element);
      }else if(element.category === "R/F Drawings"){
        this.rf_Drawings.push(element);
      }else if(element.category === "MEP Drawings"){
        this.mep_Drawings.push(element);
      }else if(element.category === "Site Instructions"){
        this.site_Instructions.push(element);
      }else if(element.category === "Method Statement"){
        this.method_Statement.push(element);
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

  addComment(){
    var block = "Block1";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data ={block}
    this.dialog.open(AddCommentComponent, dialogConfig);
  }

}
