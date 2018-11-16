import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SujetService } from '../sujet/sujet.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css'],
  providers: [SujetService]
})
export class ForumComponent implements OnInit {

  public sujets = [];

  constructor(private _sujetService: SujetService,
              private router: Router
              ) { }

  ngOnInit(){

    this._sujetService.getAllSujets().subscribe( data => this.sujets = data);
  
    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".elSujet").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }
  
  gotoInputs(id) {
    this.router.navigate(['sujet/'+id]);
  }

}
