import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { MailService } from '../services/mail.service'
import * as $ from 'jquery';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SigninComponent implements OnInit {

  public error: string;
  
  constructor(private _userService: UserService,private router: Router,private _mailService: MailService) { }

  ngOnInit() {
    $('body').css('background','url(http://localhost:8000/public/uploads/bg-login.jpg) no-repeat center fixed');
		$('body').css('background-size','cover');
  }

  addUser(email: string, username: string, password: string, checkpassword: string){
    this.error = "";
    this._mailService.checkmail(email).subscribe(res => {
      if (res['bool'] == true) {
        if (username != '' && password != '' && email != '' && password == checkpassword ) {
          this._userService.insertUser({email: email,password: password, username:username}).subscribe(data => {
            console.log("POST Request is successful", data);
            this.router.navigate(['login']);
          },
          error => {
              console.log("Error", error);
          });
        }else{
          this.error = 'Mots de passe différents ou champs vides'
        }
      } else {
        this.error = "L'email indiqué est inexistant"
      }
    });
  }
  login(){
    this.router.navigate(['login']);
  }

}
