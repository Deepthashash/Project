import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpInterceptor } from '@angular/common/http';

import{Comments} from "../models/comments.model"

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  comments = {} as Comments;

  private insertComment_url = 'http://localhost:3000/api/insertComment';
  private getAllComments_url = 'http://localhost:3000/api/getAllComments';
  private getAllCommentsBlock1_url = 'http://localhost:3000/api/getAllCommentsBlock1';
  private getAllCommentsBlock2_url = 'http://localhost:3000/api/getAllCommentsBlock2';
  private getAllCommentsBlock3_url = 'http://localhost:3000/api/getAllCommentsBlock3';
  private getCommentById_url = 'http://localhost:3000/api/getCommentById';

  constructor(private http: HttpClient) { }

  postComment(comment: Comments): Promise<any> {
    return this.http
      .post<any>(this.insertComment_url, comment)
      .toPromise();
  }

  getAllComments(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.getAllComments_url);
  }

  getAllCommentsBlock1(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.getAllCommentsBlock1_url);
  }

  getAllCommentsBlock2(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.getAllCommentsBlock2_url);
  }

  getAllCommentsBlock3(): Observable<Comments[]> {
    return this.http.get<Comments[]>(this.getAllCommentsBlock3_url);
  }

  getCommentById(id: string): Promise<Comments> {
    return this.http
      .post<any>(this.getCommentById_url, { id })
      .toPromise();
  }
}
