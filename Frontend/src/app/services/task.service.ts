import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

import{Task} from "../models/task.model"

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  tasks = {} as Task; 

  private insertTask_url = 'http://localhost:3000/api/insertTask';
  private getAllTasks_url = 'http://localhost:3000/api/getAllTasks';
  private getAllTasksBlock1_url = 'http://localhost:3000/api/getAllTasksBlock1';
  private getAllTasksBlock2_url = 'http://localhost:3000/api/getAllTasksBlock2';
  private getAllTasksBlock3_url = 'http://localhost:3000/api/getAllTasksBlock3';
  private getTaskById_url = 'http://localhost:3000/api/getTaskById';
  private getAllTasksPerUser_url = 'http://localhost:3000/api/getAllTasksPerUser';
  private getUnapprovedTasks_url = 'http://localhost:3000/api/getUnapprovedTasks  ';
  private updateAsCompleted_url = 'http://localhost:3000/api/updateAsCompleted';
  private updateAsApproved_url = 'http://localhost:3000/api/updateAsApproved';
  private deleteTask_url = 'http://localhost:3000/api/deleteTask';

  constructor(private http: HttpClient) { }

  postTask(task: Task): Promise<any> {
    return this.http
      .post<any>(this.insertTask_url, task)
      .toPromise();
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getAllTasks_url);
  }

  getAllTasksBlock1(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getAllTasksBlock1_url);
  }

  getAllTasksBlock2(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getAllTasksBlock2_url);
  }

  getAllTasksBlock3(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getAllTasksBlock3_url);
  }

  getTaskById(id: string): Promise<Task> {
    return this.http
      .post<any>(this.getTaskById_url, { id })
      .toPromise();
  }

  getAllTasksPerUser(userId: string): Promise<Task[]> {
    return this.http
      .post<any>(this.getAllTasksPerUser_url, { userId })
      .toPromise();
  }

  getUnapprovedTasks(): Promise<Task[]> {
    return this.http
      .get<any>(this.getUnapprovedTasks_url)
      .toPromise();
  }

  updateAsCompleted(id: string): Promise<Task> {
    return this.http
      .put<any>(this.updateAsCompleted_url, { id })
      .toPromise();
  }

  updateAsApproved(id: string): Promise<Task> {
    return this.http
      .put<any>(this.updateAsApproved_url, { id })
      .toPromise();
  }

  deleteTask(id: string) {
    return this.http.delete<Task>(this.deleteTask_url + '/' + id);
  }
}
