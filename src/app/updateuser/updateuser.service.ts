import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Updateuser } from './updateuser';

@Injectable()
export class UpdateuserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Updateuser[]> {
    return this.http.get<Updateuser[]>('http://localhost:8000/api/users');
  }
  
//   getQrs(id): Observable<User[]> {
//     return this.http.get<User[]>('http://localhost:8000/api/qrs/'+id);
//   }

//   getComment(message: string): Observable<Comment> {
//     return this.http.get<Comment>('http://localhost:8000/api/comments/' + message);
//   }

// insertUser(user : User): Observable<User> {
//   return this.http.post<User>('http://localhost:8000/api/users', user);
// }

  updateUser(id: number,isAdmin: number) {
    return this.http.put('http://localhost:8000/api/users/'+id, {admin:isAdmin});
  }

  deleteUser(id: number){
    return this.http.delete('http://localhost:8000/api/users/'+id);
  }
}