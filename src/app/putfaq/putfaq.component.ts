import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { QrService } from '../services/qr.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-putfaq',
  templateUrl: './putfaq.component.html',
  styleUrls: ['./putfaq.component.css'],
  providers:[ThemeService,QrService]
})
export class PutfaqComponent implements OnInit {

  constructor(private _qrService: QrService,
              private router: Router,
              public modal: NgxSmartModalService,
              private _themeService: ThemeService,
              private _authService: AuthService) { }

  private qrs = [];
  private themes = [];
  public isAdmin = this._authService.getUserType;

  openDelModal(id) {
    this.modal.resetModalData('delModal')
    console.log(id)
    this.modal.setModalData(id, 'delModal');
    this.modal.getModal('delModal').open();
  }

  openPutModal(id, question, answer) {
    let obj: Object = {
      'id': id,
      'question': question,
      'answer':answer
    }
    this.modal.resetModalData('putModal')
    this.modal.setModalData(obj, 'putModal');
    this.modal.getModal('putModal').open();
  }

  openAddModal() {
    this.modal.getModal('addModal').open();
  }

  delFaq(id) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      this._qrService.deleteFaq(id).subscribe(() => {
        for (var i = 0; i < this.qrs.length; i++) {
          console.log(this.qrs[i], id)
          if (this.qrs[i].qrs_id == id) {
            
            this.qrs.splice(i, 1);
          }
        }
        this.modal.getModal('delModal').close();

        console.log("success");
      });

    }
  }


  putFaq(id: number, question: string, answer: string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      console.log()
      this._qrService.updateFaq(id, question, answer).subscribe(() => {
       
        for (var i = 0; i < this.qrs.length; i++) {
          if (this.qrs[i].qrs_id == id) {
            this.qrs[i].question = question;
            this.qrs[i].answer = answer;
          }
        }
        this.modal.getModal('putModal').close();

        console.log("success");
      });

    }
  }

  addFaq(theme_id: number,question: string, answer: string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      let qrs = this.qrs
      let idPlus = this.getId();
      this._qrService.insertFaq(theme_id,question,answer).subscribe(function (data) {
        console.log(data);
        qrs.push({
          qrs_id: idPlus,
          theme_id: theme_id,
          question: question,
          answer: answer
        })
        console.log("success");
      });
    this.modal.getModal('addModal').close();
    }
  }

  getId() {
    if (this.qrs.length != 0) {
      return this.qrs.reduce((max, p) => p.qrs_id > max ? p.qrs_id : max, this.qrs[0].qrs_id) + 1;
    } else {
      return 0;
    }
  }

  ngOnInit() {

    if (this.isAdmin != '1') {
      this.router.navigate(['home'])
    }

    this._qrService.getAllQrs().subscribe(data=>{this.qrs = data
    console.log(this.qrs)
    });

    this._themeService.getThemes().subscribe(data=>{this.themes = data
    console.log(this.themes)
    });
    
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".elSujet").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    
  }

}
