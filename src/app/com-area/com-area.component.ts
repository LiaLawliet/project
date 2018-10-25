import { Component, OnInit } from '@angular/core';
import { QrService } from './qr.service'

@Component({
  selector: 'app-com-area',
  templateUrl: './com-area.component.html',
  styleUrls: ['./com-area.component.css'],
  providers: [QrService]
})
export class ComAreaComponent implements OnInit{

  qrs = [];
  public isCollapsed;

  constructor(private _qrService: QrService) {

  }

  changeCollapse(){
    this.isCollapsed = !this.isCollapsed;
    console.log('collapsééé')
  }
  

  ngOnInit(){
    this._qrService.getAllQrs().subscribe( data => this.qrs = data);
  }



}
