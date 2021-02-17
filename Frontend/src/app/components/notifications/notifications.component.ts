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
  count: number;

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    if(this.user.userType == "Engineer"){
      this.count = 1;
    }
  }

}
