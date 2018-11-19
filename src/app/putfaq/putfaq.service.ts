import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Putfaq } from './putfaq';
import { Theme } from './theme';

@Injectable()
export class PutfaqService {
  constructor(private http: HttpClient) {}

  getAllQrs(): Observable<Putfaq[]> {
    return this.http.get<Putfaq[]>('http://localhost:8000/api/qrs');
  }

  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>('http://localhost:8000/api/themes');
  }
  
  getQrs(id): Observable<Putfaq[]> {
    return this.http.get<Putfaq[]>('http://localhost:8000/api/qrs/'+id);
  }

//   getComment(message: string): Observable<Comment> {
//     return this.http.get<Comment>('http://localhost:8000/api/comments/' + message);
//   }

  insertFaq(theme_id : number, question: string, answer: string): Observable<void> {
    return this.http.post<void>('http://localhost:8000/api/qrs/', {theme_id : theme_id ,question:question, answer:answer});
  }

  updateFaq(id: number,question: string, answer: string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/qrs/' + id, {question:question, answer:answer});
  }

  deleteFaq(id) {
    return this.http.delete('http://localhost:8000/api/qrs/' + id);
  }
}