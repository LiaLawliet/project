import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SujetService } from '../services/sujet.service';
import { ThemeService } from '../services/theme.service';
import * as $ from 'jquery';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [SujetService,ThemeService]
})
export class ForumComponent implements OnInit {

  public sujets = [];
  public themes = [];

  constructor(private _sujetService: SujetService,
              private router: Router,
              private _authService : AuthService,
              private _themeService: ThemeService,
              private modal: NgxSmartModalService
              ) { }

  ngOnInit(){
    this._themeService.getThemes().subscribe(data=>{this.themes = data,
      console.log(this.themes)
      });

    this._sujetService.getAllNotHiddenSujets().subscribe( data => this.sujets = data);
  
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".elSujet").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }

  openAddModal() {
    this.modal.getModal('addModal').open();
  }
  
  gotoInputs(id) {
    this.router.navigate(['sujet/'+id]);
  }

  getId() {
    if (this.sujets.length != 0) {
      return this.sujets.reduce((max, p) => p.id > max ? p.id : max, this.sujets[0].id) + 1;
    } else {
      return 0;
    }
  }

  addSujet(theme_id: number, sujet_name: string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      let sujets = this.sujets
      let auth = this._authService
      let idPlus = this.getId();
      this._sujetService.insertSujet(theme_id,sujet_name,parseInt(auth.getUserID)).subscribe(function (data) {
        console.log(data);
          sujets.push({
            id: idPlus,
            theme_id: theme_id,
            sujet_name:sujet_name,
            resolu : 0,
            creator:parseInt(auth.getUserID)
          })
        console.log("success");
      });
    this.modal.getModal('addModal').close();
    }
  }

}
