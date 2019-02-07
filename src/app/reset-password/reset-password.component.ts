import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { AuthService } from '../auth.service';
import { ProfileService } from '../services/profile.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private route: ActivatedRoute, private _userService: UserService,private auth: AuthService,private router: Router,private _profileService:ProfileService) { }
  public error1 = '';
  public paramID = this.route.snapshot.paramMap.get('id');
  public paramToken = this.route.snapshot.paramMap.get('token');
  private expired;
  ngOnInit() {
		$('body').css('background','url(http://localhost:8000/public/uploads/bg-login.jpg) no-repeat center fixed');
    $('body').css('background-size','cover');
    
    this._userService.checkToken(this.paramToken).subscribe(data => {
      this.expired = data;
      console.log(this.expired);
      if(this.expired == true) {
        $('.card-body').remove();
        $('h4.text-muted').html("Page expirée<br>Redirection dans 5 secondes")
        setTimeout(() => {
          this.router.navigate(['login']);
        }, 5000);
      }
    })
  }

  putPassword(newPassword:string, checkPassword:string) {
    if (newPassword == checkPassword && newPassword != '') {
        this._profileService.updatePassword(parseInt(this.paramID), newPassword).subscribe(() => {
        this.error1='';
        console.log("success");
        this.router.navigate(['login']);
      });
    }else{
      this.error1 = 'Mots de passe diférents'
    }
  }
}
