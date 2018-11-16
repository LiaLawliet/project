import { Component, OnInit } from '@angular/core';
import { PutfaqService } from './putfaq.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-putfaq',
  templateUrl: './putfaq.component.html',
  styleUrls: ['./putfaq.component.css']
})
export class PutfaqComponent implements OnInit {

  constructor(private _putfaqService: PutfaqService,private router: Router,public modal: NgxSmartModalService,private _authService: AuthService) { }

  private qrs = [];

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

  delFaq(id) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      this._putfaqService.deleteFaq(id).subscribe(() => {
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
      this._putfaqService.updateFaq(id, question, answer).subscribe(() => {
       
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

  ngOnInit() {

    this._putfaqService.getAllQrs().subscribe(data=>{this.qrs = data
    console.log(this.qrs)
    });
    
    $("#myInput").on("keyup", function() {
      var value = $(this).val().toLowerCase();
      $(".elSujet").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
    
  }

}
