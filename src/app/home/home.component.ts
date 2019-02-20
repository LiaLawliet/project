import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SafePipeModule } from 'safe-pipe';
import { ThemeService } from '../services/theme.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public themes = [];

  constructor(private _authService: AuthService,private _themeService: ThemeService,private modal: NgxSmartModalService,private router: Router) { }

  ngOnInit(){
    $('body').css('background','none')
    $('body').css('background-color','#F3F3F3')
    this._themeService.getThemes().subscribe( data => this.themes = data);

  }

  gotoSujets(id) {
    this.router.navigate(['theme/'+id]);
  }
}
