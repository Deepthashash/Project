import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
    ) {}

  user: User;
  count = 0;
  notifications = [];

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if(this.user.userType == "Engineer"){
      this.notificationService.getAllNotificationsPerUser("admin").then(
        (res) => {
          this.count = res.length;
        }
      )
    }else {
      this.notificationService.getAllNotificationsPerUser(this.user._id).then(
        (res) => {
          this.count = res.length;
        }
      )
    }
  }

}
