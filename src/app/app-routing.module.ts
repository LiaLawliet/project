import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { ComAreaComponent } from './com-area/com-area.component';

const routes: Routes = [{path: '',component: HomeComponent,pathMatch: 'full'},
                        {path: 'input',component: InputComponent,pathMatch: 'full'},
                        {path: 'com-area',component: ComAreaComponent},
                        {path: '**', redirectTo: ''}];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
