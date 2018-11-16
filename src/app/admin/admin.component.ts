import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public isAdmin = this._authService.getUserType;

  constructor(public modal: NgxSmartModalService,
              private router: Router,
              private _authService: AuthService,) { }

  ngOnInit() {
    if (this.isAdmin != '1') {
      this.router.navigate(['home'])
    }
  }
}
