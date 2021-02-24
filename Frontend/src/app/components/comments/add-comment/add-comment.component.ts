import { Component, Inject, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/services/comments.service';
import { NotificationService } from 'src/app/services/notification.service';
import { TaskService } from 'src/app/services/task.service';
import { AddComponent } from '../../tasks/add/add.component';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {

  users = [];
  blockName: string;

  CommentAddForm = this.formBuilder.group({
    commentName: ['', [Validators.required]],
    comment: ['', [Validators.required]]
  });

  constructor(
    private formBuilder: FormBuilder,
    private commentService: CommentsService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private dialogRef: MatDialogRef<AddCommentComponent>,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) data){
      this.blockName = data.block;
    }
  

  ngOnInit(): void {
    this.authService.getAllUsers().then(
      (results) => {
        this.users = results;
      },
      (err) => {

      }
    )
  }

  getUsers(){
    
    return [
      { id: '1', name: 'User 1' },
      { id: '2', name: 'User 2' },
      { id: '3', name: 'User 3' },
      { id: '4', name: 'User 4' }
    ];
  }

  submit(formData){
    var user = this.authService.getCurrentUser();
    const formDetails = {
      _id: "",
      commentName: formData.commentName,
      comment: formData.comment,
      blockName: this.blockName,
      userId: user._id
    }
    console.log(formDetails);
    this.commentService.postComment(formDetails).then(
      (res) => {
        console.log("Success");
        var notification = {
          _id: "",
          taskId: res._id,
          isSeen: false,
          title: "New Comment in block " + this.blockName,
          userId: user._id,
          type: "comment"  
        } 
        this.notificationService.postNotification(notification).then(
          (res) => {
            console.log(res);

            this.toastrService.success('','Comment Added');
          }

        );       
        
        location.reload();
      },
      (err) => {

      }
    );
  }

  close(){
    this.dialogRef.close();
  }

}
