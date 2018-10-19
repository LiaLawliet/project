import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    
  ],
  providers: [InputComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
