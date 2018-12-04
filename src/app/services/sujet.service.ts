import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujet } from './sujet';

@Injectable()
export class SujetService {
  constructor(private http: HttpClient) {}

  getSujets(id): Observable<Sujet[]> {
    return this.http.get<Sujet[]>('http://localhost:8000/api/nothiddensujets/'+id);
  }

  getSujet(id): Observable<Sujet[]> {
    return this.http.get<Sujet[]>('http://localhost:8000/api/sujets/sujet/'+id);
  }

  resolveSujet(id: number, resolve:number): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/sujets/resolu/'+id, {resolve:resolve});
  }

  getAllNotHiddenSujets(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>('http://localhost:8000/api/nothiddensujets');
  }

  getAllSujets(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>('http://localhost:8000/api/sujets');
  }

  insertSujet(theme_id:number, sujet_name: string, creator:number): Observable<Sujet[]> {
    return this.http.post<Sujet[]>('http://localhost:8000/api/sujets', {theme_id:theme_id, sujet_name:sujet_name, creator:creator});
  }

  updateSujet(id:number, theme_id:number, sujet_name: string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/sujets/'+id, {theme_id:theme_id, sujet_name:sujet_name});
  }

  revealSujet(id:number): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/showsujets/'+id, {hidden:0});
  }

  deleteSujet(id:number): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/hidesujets/'+id, {hidden:1});
  }
}