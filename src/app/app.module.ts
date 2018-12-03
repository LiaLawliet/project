import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { AccordionModule } from "ngx-accordion";
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SujetComponent } from './sujet/sujet.component';
import { ForumComponent } from './forum/forum.component';
import { FaqComponent } from './faq/faq.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { PutfaqComponent } from './putfaq/putfaq.component';
import { PutthemesComponent } from './putthemes/putthemes.component';
import { ProfileComponent } from './profile/profile.component';

import { QrService } from './services/qr.service';
import { CommentService } from './services/comment.service';
import { AuthService } from './auth.service';
import { UserService } from './services/user.service';
import { ProfileService } from './services/profile.service';

import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    HomeComponent,
    LoginComponent,
    SujetComponent,
    ForumComponent,
    FaqComponent,
    SigninComponent,
    AdminComponent,
    UpdateuserComponent,
    PutfaqComponent,
    PutthemesComponent,
    ProfileComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    AccordionModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8000'],
        blacklistedRoutes: ['localhost:8000/api/auth']
      }
    }),
    NgbModule.forRoot(),
    NgxSmartModalModule.forRoot()
  ],
  providers: [InputComponent, CommentService, QrService, AuthService,UserService, AuthGuard, ProfileService],
  bootstrap: [AppComponent]
})
export class AppModule { }
