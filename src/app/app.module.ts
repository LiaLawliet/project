import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { ComAreaComponent } from './com-area/com-area.component';
import { CommentService } from './input/comment.service';
import { QrService } from './com-area/qr.service';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ComAreaComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [InputComponent, CommentService, QrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
