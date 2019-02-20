import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MailService {
  constructor(private http: HttpClient) {}

  resetpasswordmail(email:string,id:number): Observable<void> {
    return this.http.post<void>('http://localhost:8000/api/resetpasswordmail', {email:email, id:id});
  }
  checkmail(email:string){
    return this.http.post<void>('http://localhost:8000/api/checkmail', {email:email});
  }
}