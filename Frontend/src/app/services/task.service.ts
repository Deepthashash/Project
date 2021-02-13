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
  private getTaskById_url = 'http://localhost:3000/api/getTaskById';
  private getAllTasksPerUser_url = 'http://localhost:3000/api/getAllTasksPerUser';
  private getUnapprovedTasksPerUser_url = 'http://localhost:3000/api/getUnapprovedTasksPerUser';
  private updateAsCompleted_url = 'http://localhost:3000/api/updateAsCompleted';
  private updateAsApproved_url = 'http://localhost:3000/api/updateAsApproved';

  constructor(private http: HttpClient) { }

  postTask(task: Task): Promise<any> {
    return this.http
      .post<any>(this.insertTask_url, task)
      .toPromise();
  }

  getAllTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.getAllTasks_url);
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

  getUnapprovedTasksPerUser(userId: string): Promise<Task> {
    return this.http
      .post<any>(this.getUnapprovedTasksPerUser_url, { userId })
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
}
