import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { ComAreaComponent } from './com-area/com-area.component';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ComAreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
    
  ],
  providers: [InputComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
