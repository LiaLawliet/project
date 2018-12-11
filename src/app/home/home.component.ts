import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { SafePipeModule } from 'safe-pipe';
import { ThemeService } from '../services/theme.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ThemeService]
})
export class HomeComponent implements OnInit {

  public themes = [];

  constructor(private _authService: AuthService,private _themeService: ThemeService,private modal: NgxSmartModalService,private router: Router) { }

  ngOnInit(){
    this._themeService.getThemes().subscribe( data => this.themes = data);
  }

  gotoSujets(id) {
    this.router.navigate(['theme/'+id]);
  }
}
