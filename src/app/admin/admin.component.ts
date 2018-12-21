import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';

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
  
  gotoHome(){
    this.router.navigate(['home'])
  }

  ngOnInit() {
    $('body').css('background','none')
    $('body').css('background-color','#F3F3F3')
    if (this.isAdmin != '1') {
      this.router.navigate(['home'])
    }
  }
}
