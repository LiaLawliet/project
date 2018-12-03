import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { Updateuser } from './updateuser';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Updateuser[]> {
    return this.http.get<Updateuser[]>('http://localhost:8000/api/users');
  }

  updateUser(id: number,isAdmin: number) {
    return this.http.put('http://localhost:8000/api/users/'+id, {admin:isAdmin});
  }

  deleteUser(id: number){
    return this.http.delete('http://localhost:8000/api/users/'+id);
  }

  insertUser(user : User): Observable<User> {
    return this.http.post<User>('http://localhost:8000/api/users', user);
  }
}