import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
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
  public isAdmin = this._authService.getUserType;
  
  constructor(private _userService:UserService,private router:Router,private _authService:AuthService, private modal:NgxSmartModalService) {
    
  }
  
  public loggedUser = parseInt(this._authService.getUserID);
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
    this.modal.resetModalData('putModal')
    let obj: Object = {
      'user_id': id,
      'username': username,
      'isAdmin':isAdmin,
      'myCheck':isAdmin==1
    }
    
    this.modal.setModalData(obj, 'putModal');
    this.modal.getModal('putModal').open();
  }

  delUser(id) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      this._userService.deleteUser(id).subscribe(() => {
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
      this._userService.updateUser(id, admin).subscribe(() => {
       
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
    if (this.isAdmin != '1') {
      this.router.navigate(['home'])
    }

    this._userService.getAllUsers().subscribe(data => this.users = data);
  }

}
