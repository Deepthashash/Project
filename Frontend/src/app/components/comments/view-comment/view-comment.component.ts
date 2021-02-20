import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ViewComponent } from '../../tasks/view/view.component';

@Component({
  selector: 'app-view-comment',
  templateUrl: './view-comment.component.html',
  styleUrls: ['./view-comment.component.scss']
})
export class ViewCommentComponent implements OnInit {
  id: string;
  comment: any;
  userName: any;

  constructor(
    private commentService: CommentsService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private dialogRef: MatDialogRef<ViewComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
      this.id = data.id;
    }
  

  ngOnInit(): void {
    this.commentService.getCommentById(this.id).then(
      (res) => {
        this.comment = res;
        this.authService.getUser(res.userId).then(
          (res) => {
            this.userName = res.firstName + " " +res.lastName;
          })        
      },
      (err) => {

      }
    )
  }


  close(){
    this.dialogRef.close();
  }

      
}
