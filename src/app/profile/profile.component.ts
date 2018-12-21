import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Router } from '@angular/router';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { ProfileService } from '../services/profile.service';
import { SujetService } from '../services/sujet.service';
import { ResourceLoader } from '@angular/compiler';
import * as $ from 'jquery';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers:[SujetService,ProfileService]
})
export class ProfileComponent implements OnInit {

  public error1 : string;
  public error2 : string;
  private userId = parseInt(this.auth.getUserID) 
  
  constructor(private auth:AuthService,private _sujetService : SujetService, private http:HttpClient, private modal:NgxSmartModalService,private router: Router, private _profileService:ProfileService) {
    
   }
  public sujetsCreated =[];
  selectedFile: File = null;
  url = '';
  gotoInputs(id) {
		this.router.navigate(['sujet/' + id]);
  }
  
  ngOnInit() {
    $('body').css('background','none')
    $('body').css('background-color','#F3F3F3')
    if (window.innerWidth <= 767 ) {
      $('.profil-header').css('text-align','center')
    }
    this._sujetService.getCreated(this.userId).subscribe( data => this.sujetsCreated = data);
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target['result'];
      }
    }
  }

  openImgModal() {
    this.modal.getModal('imgModal').open();
  }

  getImage(){
    if (this.url == '') {
      return 'none';
    }else{
      return 'block';
    }
  }

  onUpload(){
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name)
    this.http.post<File>('http://localhost:8000/api/upload/'+this.userId, fd, {
      reportProgress:true,
      observe:'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload progress: '+ Math.round(event.loaded/event.total * 100)+'%')
      }else if(event.type === HttpEventType.Response){
        console.log(event.body)
        localStorage.setItem('image', event.body['filename']);
        this.modal.getModal('imgModal').close();
        this.url = '';
      }
      
    })
  }

  openUsernameModal(username) {
    console.log(this.auth.getUserImage);
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
