import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

//   getAllQrs(): Observable<User[]> {
//     return this.http.get<User[]>('http://localhost:8000/api/qrs');
//   }
  
//   getQrs(id): Observable<User[]> {
//     return this.http.get<User[]>('http://localhost:8000/api/qrs/'+id);
//   }

//   getComment(message: string): Observable<Comment> {
//     return this.http.get<Comment>('http://localhost:8000/api/comments/' + message);
//   }

insertUser(user : User): Observable<User> {
  return this.http.post<User>('http://localhost:8000/api/users', user);
}
/*
  updateComment(comment: Comment): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/comments/' + comment.message, comment);
  }

  /*deleteComment(message: string) {
    return this.http.delete('http://localhost:8000/api/comments/' + Comment.id);
  }*/
}