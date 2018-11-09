import { Component, OnInit } from '@angular/core';
import { ThemeService } from './theme.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [ThemeService]
})
export class HomeComponent implements OnInit {

  public themes = [];

  constructor(private _themeService: ThemeService) { }

  ngOnInit(){
    this._themeService.getAllThemes().subscribe( data => this.themes = data);
  }

}
