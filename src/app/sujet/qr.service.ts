import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Qr } from './qr';

@Injectable()
export class QrService {
  constructor(private http: HttpClient) {}

  getAllQrs(): Observable<Qr[]> {
    return this.http.get<Qr[]>('http://localhost:8000/api/qrs');
  }
  
  getQrs(id): Observable<Qr[]> {
    return this.http.get<Qr[]>('http://localhost:8000/api/qrs/'+id);
  }

//   getComment(message: string): Observable<Comment> {
//     return this.http.get<Comment>('http://localhost:8000/api/comments/' + message);
//   }

//   insertComment(comment: string): Observable<Comment> {
//     return this.http.post<Comment>('http://localhost:8000/api/comments/', comment);
//   }
/*
  updateComment(comment: Comment): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/comments/' + comment.message, comment);
  }

  /*deleteComment(message: string) {
    return this.http.delete('http://localhost:8000/api/comments/' + Comment.id);
  }*/
}