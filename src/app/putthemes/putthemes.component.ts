import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';
import { SujetService } from '../services/sujet.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { HttpClient,HttpEventType } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { Router} from '@angular/router';

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
              private http: HttpClient) { }

  selectedFile: File = null;

  getColor(hidden){
    if (hidden == 0) {
      return '0px 0px 20px 0px #009688';
    }else{
      return '0px 0px 20px 0px #ff8080';
    }
  }

  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
  }

  openImgModal(id) {
    let obj: Object = {
      'id': id
    }
    this.modal.resetModalData('imgModal')
    this.modal.setModalData(obj, 'imgModal');
    this.modal.getModal('imgModal').open();
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
    })
  }

  openAddModal() {
    this.modal.getModal('addModal').open();
  }

  openPutModal(id, theme_name) {
    let obj: Object = {
      'id': id,
      'theme_name':theme_name
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

  addTheme(theme_name: string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      let themes = this.themes
      let idPlus = this.getId();
      this._themeService.insertTheme(theme_name).subscribe(function (data) {
        console.log(data);
        themes.push({
          id: idPlus,
          theme_name: theme_name,
          hidden: 0
        })
        console.log("success");
      });
    this.modal.getModal('addModal').close();
    }
  }

  putTheme(id: number, theme_name:string) {
    if (this._authService.loggedOut) {
      this.router.navigate(['login'])
    } else {
      console.log()
      this._themeService.updateTheme(id, theme_name).subscribe(() => {
       
        for (var i = 0; i < this.themes.length; i++) {
          if (this.themes[i].id == id) {
            this.themes[i].theme_name = theme_name;
          }
        }
        this.modal.getModal('putModal').close();

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

    this._themeService.getAllThemes().subscribe( data => this.themes = data);
  }

}
