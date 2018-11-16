import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project';
  constructor(private auth: AuthService, private router: Router) {
    console.log(auth)
   }

  logout() {
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
