import { Component, OnInit } from '@angular/core';
import { UpdateuserService } from './updateuser.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  private users = [];
  myCheck:any;

  constructor(private _updateuserService:UpdateuserService,private router:Router,private _authService:AuthService, private modal:NgxSmartModalService) {

  }

  openDelModal(id,username) {
    let obj: Object = {
      'user_id': id,
      'username':username
    }
    this.modal.resetModalData('delModal')
    console.log(id)
    this.modal.setModalData(obj, 'delModal');
    this.modal.getModal('delModal').open();
  }

  openPutModal(id, username, isAdmin) {
    let obj: Object = {
      'user_id': id,
      'username': username,
      'isAdmin':isAdmin
    }
    this.modal.resetModalData('putModal')
    this.modal.setModalData(obj, 'putModal');
    this.modal.getModal('putModal').open();
  }

  delUser(id) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      this._updateuserService.deleteUser(id).subscribe(() => {
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].user_id == id) {
            
            this.users.splice(i, 1);
          }
        }
        this.modal.getModal('delModal').close();

        console.log("success");
      });

    }
  }


  putUser(id: number, isAdmin: boolean) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    }else{
      let admin;
      if(isAdmin == true) {
        admin = 1;
      }else{
        admin = 0;
      }
      this._updateuserService.updateUser(id, admin).subscribe(() => {
       
        for (var i = 0; i < this.users.length; i++) {
          if (this.users[i].user_id == id) {
            this.users[i].isAdmin = admin;
          }
        }
        this.modal.getModal('putModal').close();

        console.log("success");
      });

    }
  }

  ngOnInit() {
    this._updateuserService.getAllUsers().subscribe(data => this.users = data);
  }

}
