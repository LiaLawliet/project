import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { ComAreaComponent } from './com-area/com-area.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { SujetComponent } from './sujet/sujet.component';

const routes: Routes = [{path: 'home',component: HomeComponent},
                        { path: 'theme', component: SujetComponent },
                        {path: 'input',component: InputComponent},
                        {path: 'com-area',component: ComAreaComponent},
                        {path: 'login', component: LoginComponent},
                        {path: '**', redirectTo: 'home', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
