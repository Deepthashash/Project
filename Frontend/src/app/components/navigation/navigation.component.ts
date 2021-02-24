import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Notification } from 'src/app/models/notification.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ViewCommentComponent } from '../comments/view-comment/view-comment.component';
import { ViewComponent } from '../tasks/view/view.component';
import { EventEmitterService } from 'src/app/services/event-emitter.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService,
    private eventEmitterService: EventEmitterService,
    private dialog: MatDialog
    ) { }

    user:User;
    count = 0;
    notifications = [];
    notifications1 = [];
    notifications2 = [];

  ngOnInit(): void {

    if (this.eventEmitterService.subsVar==undefined) {    
      this.eventEmitterService.subsVar = this.eventEmitterService.    
      invokeFirstComponentFunction.subscribe((name:string) => {    
        location.reload;    
      });    
    }

    this.user = this.authService.getCurrentUser();
    if((this.user.userType == "Engineer") || (this.user.userType == "ProjectManager")){
      this.notificationService.getAllNotificationsPerUser("admin").then(
        (res) => {
          this.count = res.length;
          this.notifications = res;
        }
      )
    }else {
      this.notificationService.getAllNotificationsPerUser(this.user._id).then(
        (res) => {
          this.count = res.length;
          this.notifications = res;
        }
      )
    }

    this.notificationService.getAllCommentNotifications().then(
      (res) => {
        this.count = this.count + res.length;
        this.notifications = this.notifications.concat(res);
      },
      (err) => {
        console.log(err);
      }
    )


  }



  logout(){
    localStorage.clear();
    this.router.navigate(['/login']);
    location.reload();
  }

  openProfile(){
    this.user = this.authService.getCurrentUser();
    if((this.user.userType == "ProjectManager") || (this.user.userType == "Engineer") ){
      this.router.navigate(['/admin']);      
    }else{
      this.router.navigate(['/profile']);
    }
  }

  openNotification(notification:Notification){
    var id = notification.taskId;
    if(notification.type == "comment"){
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "50%";
      dialogConfig.data ={id}
      this.dialog.open(ViewCommentComponent, dialogConfig);
    }else{
      var isBlock = true;
      var isAdmin = false;
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.width = "50%";
      dialogConfig.data ={id,isBlock,isAdmin}
      this.dialog.open(ViewComponent, dialogConfig);
    }      
    this.notificationService.updateAsSeen(notification._id).then(
      (res) => {
        console.log("done");
      }
    )
  }


}
