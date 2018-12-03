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