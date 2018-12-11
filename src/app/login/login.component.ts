import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import * as $ from 'jquery';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public email: string;
  public password: string;
  public error: string;

  constructor(private auth: AuthService, private router: Router) {
   }
  

  public submit() {
    this.auth.login(this.email, this.password)
      .pipe(first())
      .subscribe(
        result => this.router.navigate(['home']),
        err => this.error = 'Could not authenticate'
      );
  }
  /**
   * name
   */
  public register() {
    this.router.navigate(['signin'])
  }
}
