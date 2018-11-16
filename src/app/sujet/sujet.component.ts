import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SujetService } from './sujet.service';
import { QrService } from './qr.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.css'],
  providers: [SujetService, QrService]
})

export class SujetComponent implements OnInit {

  public sujets = [];
  public qrs = [];

  constructor(private _sujetService: SujetService,
              private _qrService: QrService,
              private route: ActivatedRoute,
              private router: Router) {}
            
  
  ngOnInit(){
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._sujetService.getSujets(params.get('id')))
    ).subscribe( data => this.sujets = data);

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this._qrService.getQrs(params.get('id')))
    ).subscribe( data => this.qrs = data);

    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".elSujet").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        $("h5").filter(function() {
          $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }

  gotoInputs(id) {
    this.router.navigate(['sujet/'+id]);
  }
}

