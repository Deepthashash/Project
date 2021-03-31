import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { TaskService } from 'src/app/services/task.service';
import { ViewComponent } from '../tasks/view/view.component';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  id:string;
  type:string; 

  constructor(
    private authService: AuthService,
    private fileService: FileUploadService,
    private taskService: TaskService,
    private router: Router,
    private dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
      this.type = data.type; 
    }

  ngOnInit(): void {
  }

  delete(){
    if(this.type=="task"){
      this.taskService.deleteTask(this.id).subscribe(
        (res) => {
          console.log("Success");
          // this.router.navigate(['/admin']);
          location.reload();
        },
        (err) => {
          console.log(err);
        }
      )
    }else if(this.type == "user"){
      this.authService.deleteUser(this.id).subscribe(
        (res) => {
          console.log("Success");
          // this.router.navigate(['/admin']);
          location.reload();
        },
        (err) => {
          console.log(err);
        }
      )
    }else{
      this.fileService.deleteFile(this.id).subscribe(
        (res) => {
          console.log("Success");
          // this.router.navigate(['/admin']);
          location.reload();
        },
        (err) => {
          console.log(err);
        }
      )
    } 
    
  }

}
