import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public error1 : string;
  public error2 : string;
  
  constructor(private auth:AuthService, private modal:NgxSmartModalService,private router: Router, private _profileService:ProfileService) { }
  
  ngOnInit() {
  }

  openUsernameModal(username) {
    let obj: Object = {
      'username': username
    }
    this.modal.resetModalData('usernameModal')
    this.modal.setModalData(obj, 'usernameModal');
    this.modal.getModal('usernameModal').open();
  }

  putUsername(username: string) {
    if (this.auth.loggedOut) {
      this.router.navigate(['login'])
    }else{
      console.log(this.auth.getUser)
      this._profileService.updateUsername(parseInt(this.auth.getUserID), username).subscribe(() => {
        
        localStorage.setItem('username', username);
        
        this.modal.getModal('usernameModal').close();

        console.log("success");
      });

    }
  }

  openEmailModal(email) {
    let obj: Object = {
      'email': email
    }
    this.modal.resetModalData('emailModal')
    this.modal.setModalData(obj, 'emailModal');
    this.modal.getModal('emailModal').open();
  }

  putEmail(email: string) {
    if (this.auth.loggedOut) {
      this.router.navigate(['login'])
    }else{
      console.log(this.auth.getUserEmail)
      this._profileService.updateEmail(parseInt(this.auth.getUserID), email).subscribe(() => {
        
        localStorage.setItem('email', email);
        
        this.modal.getModal('emailModal').close();

        console.log("success");
      });

    }
  }

  openPasswordModal(password) {
    let obj: Object = {
      'password': password,
      'newPassword': '',
      'checkPassword':''
    }
    this.modal.resetModalData('passwordModal')
    this.modal.setModalData(obj, 'passwordModal');
    this.modal.getModal('passwordModal').open();
  }

  putPassword(password: string,newPassword:string,checkPassword:string) {
    if (this.auth.loggedOut) {
      this.router.navigate(['login'])
    }else{
      if(this.auth.getPassword == password) {
        this.error2='';
        if (newPassword == checkPassword && newPassword != '') {
            this._profileService.updatePassword(parseInt(this.auth.getUserID), newPassword).subscribe(() => {
          
            localStorage.setItem('password', newPassword);
            
            this.modal.getModal('passwordModal').close();

            this.error1='';

            console.log("success");
          });
        }else{
          this.error1 = 'Mot de passe incorrect'
        }
        
      }else{
        this.error2='Mot de passe incorrect';
      }
      

    }
  }

}
