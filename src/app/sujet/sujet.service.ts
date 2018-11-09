import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujet } from './sujet';

@Injectable()
export class SujetService {
  constructor(private http: HttpClient) {}

  getSujets(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>('http://localhost:8000/api/sujets');
  }
}