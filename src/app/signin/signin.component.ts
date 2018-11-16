import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SigninComponent implements OnInit {

  public error: string;
  
  constructor(private _userService: UserService,private router: Router) { }

  ngOnInit() {
  }

  addUser(email: string, username: string, password: string, checkpassword: string){
    if (password == checkpassword) {
      this._userService.insertUser({email: email,password: password, username:username}).subscribe(data => {
        console.log("POST Request is successful ", data);
        this.router.navigate(['login']);
    },
    error => {
        console.log("Error", error);
    });
    }else{
      this.error = 'Non-identical passwords'
    }
  }

}
