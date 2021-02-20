import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../models/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notification = {} as Notification;

  private insertNotification_url = 'http://localhost:3000/api/insertNotification';
  private getAllNotification_url = 'http://localhost:3000/api/getAllNotification';
  private getNotificationById_url = 'http://localhost:3000/api/getNotificationById';
  private getAllNotificationsPerUser_url = 'http://localhost:3000/api/getAllNotificationsPerUser';
  private updateAsSeen_url = 'http://localhost:3000/api/updateAsSeen';
  private getAllCommentNotifications_url = 'http://localhost:3000/api/getAllCommentNotifications';

  constructor(private http: HttpClient) { }

  postNotification(notification: Notification): Promise<any> {
    return this.http
      .post<any>(this.insertNotification_url, notification)
      .toPromise();
  }

  getAllNotification(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.getAllNotification_url);
  }

  getAllNotificationsPerUser(userId: string): Promise<Notification[]> {
    return this.http
      .post<any>(this.getAllNotificationsPerUser_url, { userId })
      .toPromise();
  }

  getNotificationById(id: string): Promise<Notification> {
    return this.http
      .post<any>(this.getNotificationById_url, { id })
      .toPromise();
  }

  updateAsSeen(id: string): Promise<Notification> {
    return this.http
      .put<any>(this.updateAsSeen_url, { id })
      .toPromise();
  }

  getAllCommentNotifications(): Promise<Notification[]> {
    return this.http.get<any>(this.getAllCommentNotifications_url).toPromise();
  }
  
}
