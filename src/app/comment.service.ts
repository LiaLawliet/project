import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

export interface Comment {
  id: string;
  message: string;
}

@Injectable()
export class CommentService {
  constructor(privommente http: HttpClient) {}

  getAllComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>('http://localhost:8000/api/comments');
  }

  getComment(message: string): Observable<Comment> {
    return this.http.get<Comment>('http://localhost:8000/api/comments/' + message);
  }

  insertComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>('http://localhost:8000/api/comments/', comment);
  }

  updateComment(comment: Comment): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/comments/' + comment.message, comment);
  }

  deleteComment(message: string) {
    return this.http.delete('http://localhost:8000/api/comments/' + id);
  }
}