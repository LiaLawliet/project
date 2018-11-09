import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from './comment';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {}

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8000/api/comments');
  }

  /*getComment(message: string): Observable<Comment> {
    return this.http.get<Comment>('http://localhost:8000/api/comments/' + message);
  }*/

  insertComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:8000/api/comments/', comment);
  }
/*
  updateComment(comment: Comment): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/comments/' + comment.message, comment);
  }*/

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8000/api/comments/'+ id);
  }
}