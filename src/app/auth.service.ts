import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<boolean> {
    return this.http.post<{password:string, email: string,isAdmin: string,user_id:string , username:string,token: string}>('http://localhost:8000/api/auth', {email: email, password: password})
      .pipe(
        map(result => {
          console.log(result.user_id)
          localStorage.setItem('access_token', result.token);
          localStorage.setItem('username', result.username);
          localStorage.setItem('email', result.email);
          localStorage.setItem('user_id', result.user_id );
          localStorage.setItem('isAdmin', result.isAdmin );
          localStorage.setItem('password', result.password );
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('username');
    localStorage.removeItem('user_id');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
  }
  public get getUser(): string {
    return localStorage.getItem('username') || '' ;
  }

  public get getUserType(): string {
    return localStorage.getItem('isAdmin') || '' ;
  }

  public get getUserID(): string {
    return localStorage.getItem('user_id') || '' ;
  }
  
  public get getPassword(): string {
    return localStorage.getItem('password') || '' ;
  }

  public get getUserEmail(): string {
    return localStorage.getItem('email') || '' ;
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public get loggedOut(): boolean {
    return (localStorage.getItem('access_token') == null);
  }
}
