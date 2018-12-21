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

  getComments(id:number): Observable<void> {
    return this.http.get<void>('http://localhost:8000/api/comments/'+id);
  }

  insertComment(sender_id:number,sujet_id: number,message: string, date: Date): Observable<void> {
    return this.http.post<void>('http://localhost:8000/api/comments', {sender_id:sender_id,sujet_id:sujet_id,message:message,date:date});
  }
  updateComment(id: number,message: string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/comments/' + id, {message:message});
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>('http://localhost:8000/api/comments/'+ id);
  }
}