import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { ThemeService } from './theme.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ThemeService]
})
export class HomeComponent implements OnInit {

  public themes = [];

  constructor(private _themeService: ThemeService,private router: Router,) { }

  ngOnInit(){
    this._themeService.getAllThemes().subscribe( data => this.themes = data);
  }

  gotoSujets(id) {
    this.router.navigate(['theme/'+id]);
  }
}
