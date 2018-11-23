import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Theme } from './theme';
import { Observable } from 'rxjs';

@Injectable()
export class PutthemesService {
  constructor(private http: HttpClient) {}


//   getComment(message: string): Observable<Comment> {
//     return this.http.get<Comment>('http://localhost:8000/api/comments/' + message);
//   }
  getAllThemes(): Observable<Theme[]> {
    return this.http.get<Theme[]>('http://localhost:8000/api/themes');
  }

  insertTheme(theme_name:string): Observable<Theme> {
    return this.http.post<Theme>('http://localhost:8000/api/themes', {theme_name:theme_name});
  }

  updateTheme(id: number,theme_name:string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/themes/'+id, {theme_name:theme_name});
  }

  // deleteTheme(id) {
  //   return this.http.delete('http://localhost:8000/api/qrs/' + id);
  // }
}