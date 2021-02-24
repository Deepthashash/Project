import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Task } from 'src/app/models/task.model';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { TaskService } from 'src/app/services/task.service';
import { DeleteComponent } from '../delete/delete.component';

@Component({
  selector: 'files-summary',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {
  files = [];

  constructor(
    private taskservice: TaskService,
    private authService: AuthService,
    private fileService: FileUploadService,
    private dialog: MatDialog 
  ) { }

  ngOnInit(): void {
    this.fileService.getAllFiles().subscribe(
      (res) => {
        this.files = res;
      }
    )
    
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
    var type="file";
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
    // this.dialog.open(EditTaskComponent, dialogConfig);
  }

}
