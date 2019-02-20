import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { MailService } from '../services/mail.service'
import { Router } from '@angular/router';
import * as $ from 'jquery';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private _userService: UserService,private router: Router,private _mailService: MailService) { }

  ngOnInit() {
		$('body').css('background','url(http://localhost:8000/public/uploads/bg-login.jpg) no-repeat center fixed');
		$('body').css('background-size','cover');
  }

  sendEmail(){
    this._userService.getUserByEmail($('#email').val()).subscribe(data => {
      if (data.length == 0) {
      console.log('Aucun résultat')
    }else{
      console.log(data[0]);
      this._mailService.resetpasswordmail(data[0]['email'],data[0]['user_id']).subscribe();
    }})
  }

}
