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

  getComments(id:number): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8000/api/comments/'+id);
  }

  insertComment(id: number,comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:8000/api/comments/'+ id, comment);
  }
  updateComment(id: number,message: string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/comments/' + id, {message:message});
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8000/api/comments/'+ id);
  }
}