import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QrService } from '../services/qr.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  providers: [QrService]
})
export class FaqComponent implements OnInit {

  public qrs = [];

  constructor(private _qrService: QrService,
              private router: Router) { }

  ngOnInit() {
    this._qrService.getAllQrs().subscribe( data => this.qrs = data);

    $(document).ready(function(){
      $("#myInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("h5").filter(function() {
          $(this).parent().parent().toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
      });
    });
  }

}
