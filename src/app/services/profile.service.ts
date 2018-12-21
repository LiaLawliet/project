import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProfileService {
  constructor(private http: HttpClient) {}

  updateUsername(id: number,username: string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/username/'+ id, {username:username});
  }

  updateEmail(id: number,email: string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/email/'+ id, {email:email});
  }

  updatePassword(id: number,password: string): Observable<void> {
    return this.http.put<void>('http://localhost:8000/api/password/'+ id, {password:password});
  }

}