import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Theme } from './theme';

@Injectable()
export class ThemeService {
  constructor(private http: HttpClient) {}

  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>('http://localhost:8000/api/themes');
  }

  insertTheme(theme_name:string): Observable<Theme> {
    return this.http.post<Theme>('http://localhost:8000/api/themes', {theme_name:theme_name});
  }

  updateTheme(id: number,theme_name:string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/themes/'+id, {theme_name:theme_name});
  }

}