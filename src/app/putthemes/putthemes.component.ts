import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { SujetService } from '../services/sujet.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-putthemes',
  templateUrl: './putthemes.component.html',
  styleUrls: ['./putthemes.component.css'],
  providers:[ThemeService,SujetService]
})
export class PutthemesComponent implements OnInit {
  private hover = false;
  private themes = [];
  public isAdmin = this._authService.getUserType;
  private userId = parseInt(this._authService.getUserID) 

  constructor(private router: Router,
              private _authService: AuthService,
              private _themeService: ThemeService,
              private _sujetService: SujetService,
              private modal: NgxSmartModalService,
              private http: HttpClient) {
                
               }

  selectedFile: File = null;
  url = '';

  gotoHome(){
    this.router.navigate(['home'])
  }

  gotoAdmin(){
    this.router.navigate(['admin'])
  }

  getColor(hidden){
    if (hidden == 0) {
      return '0px 0px 20px 0px #009688';
    }else{
      return '0px 0px 20px 0px #ff8080';
    }
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

  openImgModal(id) {
    let obj: Object = {
      'id': id
    }
    this.modal.resetModalData('imgModal')
    this.modal.setModalData(obj, 'imgModal');
    this.modal.getModal('imgModal').open();
  }

  getImage(){
    if (this.url == '') {
      return 'none';
    }else{
      return 'block';
    }
  }

  onUpload(id){
    const fd = new FormData();
    fd.append('image',this.selectedFile,this.selectedFile.name)
    this.http.post<File>('http://localhost:8000/api/uploadtheme/'+id, fd, {
      reportProgress:true,
      observe:'events'
    }).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        console.log('Upload progress: '+ Math.round(event.loaded/event.total * 100)+'%')
      }else if(event.type === HttpEventType.Response){
        console.log(event.body);
        for (var i = 0; i < this.themes.length; i++) {
          if (this.themes[i].id == id) {
            this.themes[i].image = event.body['filename'];
          }
        }
      }
      this.modal.getModal('imgModal').close();
      this.url = '';
      $('.growl-notification').trigger( "click" );
    })
  }

  openAddModal() {
    this.modal.getModal('addModal').open();
  }

  openPutModal(id, theme_name,description) {
    let obj: Object = {
      'id': id,
      'theme_name':theme_name,
      'description':description
    }
    this.modal.resetModalData('putModal')
    this.modal.setModalData(obj, 'putModal');
    this.modal.getModal('putModal').open();
  }

  openShowModal(id) {
    let obj: Object = {
      'id': id
    }
    this.modal.resetModalData('showModal')
    this.modal.setModalData(obj, 'showModal');
    this.modal.getModal('showModal').open();
  }

  openHideModal(id) {
    let obj: Object = {
      'id': id
    }
    this.modal.resetModalData('hideModal')
    this.modal.setModalData(obj, 'hideModal');
    this.modal.getModal('hideModal').open();
  }

  addTheme(theme_name: string, description: string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      let themes = this.themes
      let idPlus = this.getId();
      this._themeService.insertTheme(theme_name,description).subscribe(function (data) {
        console.log(data);
        themes.push({
          id: idPlus,
          theme_name: theme_name,
          description: description,
          image: 'default.jpg',
          hidden: 0
        })
        console.log("success");
      });
    this.modal.getModal('addModal').close();
    $('.growl-add').trigger( "click" );
    }
  }

  putTheme(id: number, theme_name:string, description:string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      console.log()
      this._themeService.updateTheme(id, theme_name,description).subscribe(() => {
       
        for (var i = 0; i < this.themes.length; i++) {
          if (this.themes[i].id == id) {
            this.themes[i].theme_name = theme_name;
            this.themes[i].description = description;
          }
        }
        this.modal.getModal('putModal').close();
        $('.growl-notification').trigger( "click" );
        console.log("success");
      });

    }
  }

  showTheme(id: number) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      console.log()
      this._themeService.revealTheme(id).subscribe(() => {
        console.log('Thème modifié');
        this._sujetService.revealSujetFromTheme(id).subscribe(() =>{
          for (var i = 0; i < this.themes.length; i++) {
            if (this.themes[i].id == id) {
              this.themes[i].hidden = 0;
            }
          }
          this.modal.getModal('showModal').close();
          $('.growl-notification').trigger( "click" );
          console.log('Sujets modifiés');
        })
      });
    }
  }

  hideTheme(id: number) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      console.log()
      this._themeService.deleteTheme(id).subscribe(() => {
        console.log('Thème modifié');
        this._sujetService.deleteSujetFromTheme(id).subscribe(() =>{
          for (var i = 0; i < this.themes.length; i++) {
            if (this.themes[i].id == id) {
              this.themes[i].hidden = 1;
            }
          }
          this.modal.getModal('hideModal').close();
          $('.growl-notification').trigger( "click" );
          console.log('Sujets modifiés');
        })
      });
    }
  }

  getId() {
    if (this.themes.length != 0) {
      return this.themes.reduce((max, p) => p.id > max ? p.id : max, this.themes[0].id) + 1;
    } else {
      return 0;
    }
  }

  ngOnInit() {
    if (this.isAdmin != '1') {
      this.router.navigate(['home'])
    }
    $('body').css('background','none')
    $('body').css('background-color','#F3F3F3')
    this._themeService.getAllThemes().subscribe( data => this.themes = data);
  }

}
