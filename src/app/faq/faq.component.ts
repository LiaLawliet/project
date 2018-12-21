import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QrService } from '../services/qr.service';
import { ThemeService } from '../services/theme.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  providers: [QrService]
})
export class FaqComponent implements OnInit {

  private qrs = [];
  private themes = [];

  constructor(private _qrService: QrService,
              private _themeService: ThemeService,
              private router: Router) { }

  gotoHome(){
    this.router.navigate(['home'])
  }

  ngOnInit() {
    $('body').css('background','none')
    $('body').css('background-color','#F3F3F3')
    this._qrService.getAllQrs().subscribe( data => this.qrs = data);
    this._themeService.getThemes().subscribe( data => this.themes = data);

    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $(".elSujet").filter(function() {
          $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }

}
