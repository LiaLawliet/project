import { switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SujetService } from '../services/sujet.service';
import { ThemeService } from '../services/theme.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from '../auth.service';
import { QrService } from '../services/qr.service';
import * as $ from 'jquery';


@Component({
  selector: 'app-sujet',
  templateUrl: './sujet.component.html',
  styleUrls: ['./sujet.component.css'],
  providers: [SujetService, QrService, ThemeService]
})

export class SujetComponent implements OnInit {

  public param = this.route.snapshot.paramMap.get('id');
  public sujets = [];
  private themes = [];
  public qrs = [];

  constructor(private _sujetService: SujetService,
              private _qrService: QrService,
              private route: ActivatedRoute,
              private router: Router,
              private _themeService: ThemeService,
              private _authService: AuthService,
              private modal: NgxSmartModalService) {}
  
              
      
  openAddModal() {
    let obj: Object = {
      'theme_id':parseInt(this.param)
    }
    this.modal.resetModalData('addModal')
    this.modal.setModalData(obj, 'addModal');
    this.modal.getModal('addModal').open();
  }

  
  addSujet(theme_id :number,sujet_name: string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      let sujets = this.sujets
      let auth = this._authService
      let param = this.param
      let idPlus = this.getId();
      this._sujetService.insertSujet(theme_id,sujet_name,parseInt(auth.getUserID)).subscribe(function (data) {
        console.log(data);
          sujets.push({
            id: idPlus,
            theme_id: parseInt(param),
            sujet_name:sujet_name,
            resolu : 0,
            creator:parseInt(auth.getUserID)
          })
        console.log("success");
      });
    this.modal.getModal('addModal').close();
    }
  }

  getId() {
    if (this.sujets.length != 0) {
      return this.sujets.reduce((max, p) => p.id > max ? p.id : max, this.sujets[0].id) + 1;
    } else {
      return 0;
    }
  }
  
  ngOnInit(){

    console.log(this.param)

    this._themeService.getThemes().subscribe(data=>{this.themes = data
      console.log(this.themes)
      });

    this._sujetService.getSujets(parseInt(this.param)).subscribe( data => this.sujets = data);

    this._qrService.getQrs(parseInt(this.param)).subscribe( data => this.qrs = data);

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

