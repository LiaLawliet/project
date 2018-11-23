import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sujet } from './sujet';
import { Theme } from './theme';
import { identifierModuleUrl } from '@angular/compiler';

@Injectable()
export class SujetService {
  constructor(private http: HttpClient) {}

  getSujets(id): Observable<Sujet[]> {
    return this.http.get<Sujet[]>('http://localhost:8000/api/sujets/'+id);
  }

  getAllSujets(): Observable<Sujet[]> {
    return this.http.get<Sujet[]>('http://localhost:8000/api/sujets');
  }

  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>('http://localhost:8000/api/themes');
  }

  insertSujet(theme_id:number, sujet_name: string): Observable<Sujet[]> {
    return this.http.post<Sujet[]>('http://localhost:8000/api/sujets', {theme_id:theme_id, sujet_name:sujet_name});
  }
}