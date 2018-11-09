import { Component, OnInit } from '@angular/core';
import { SujetService } from './sujet.service'

@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.css'],
  providers: [SujetService]
})
export class SujetComponent implements OnInit {

  public sujets = [];

  constructor(private _sujetService: SujetService) { }

  ngOnInit(){
    this._sujetService.getSujets().subscribe( data => this.sujets = data);
  }

}

