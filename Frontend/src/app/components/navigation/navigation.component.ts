import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private authService: AuthService
    ) { }

    user:User;
    count = 0;
    notifications = [];
    notifications1 = [];
    notifications2 = [];

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if(this.user.userType == "Engineer"){
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
  }

  openProfile(){
    this.user = this.authService.getCurrentUser();
    if((this.user.userType == "Engineer") || (this.user.userType == "Supervisor") ){
      this.router.navigate(['/admin']);      
    }else{
      this.router.navigate(['/profile']);
    }
  }

  openNotification(){
    console.log("Hi");
  }


}
