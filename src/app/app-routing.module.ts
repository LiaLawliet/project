import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InputComponent } from './input/input.component';
import { ForumComponent } from './forum/forum.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginComponent } from './login/login.component';
import { FaqComponent } from './faq/faq.component';
import { PutfaqComponent } from './putfaq/putfaq.component';
import { PutthemesComponent } from './putthemes/putthemes.component';
import { PutsujetsComponent } from './putsujets/putsujets.component';
import { AuthGuard } from './auth.guard';
import { SujetComponent } from './sujet/sujet.component';
import { SigninComponent } from './signin/signin.component';
import { AdminComponent } from './admin/admin.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [{path: 'home',component: HomeComponent},
                        {path: 'forgotPassword', component: ForgotPasswordComponent},
                        {path: 'resetpassword/:id/:token', component: ResetPasswordComponent},
                        {path: 'forum', component: ForumComponent},
                        {path: 'admin', component: AdminComponent},
                        {path: 'profile', component: ProfileComponent},
                        {path: 'admin/putfaq', component: PutfaqComponent},
                        {path: 'admin/putthemes', component: PutthemesComponent},
                        {path: 'admin/putsujets', component: PutsujetsComponent},
                        {path: 'admin/updateuser', component: UpdateuserComponent},
                        {path: 'faq', component: FaqComponent},
                        {path: 'theme/:id', component: SujetComponent},
                        {path: 'sujet/:id',component: InputComponent},
                        {path: 'login', component: LoginComponent},
                        {path: 'signin', component: SigninComponent},
                        {path: '**', redirectTo: 'home', pathMatch:'full'}];

@NgModule({
  imports: [RouterModule.forRoot(routes),NgbModule.forRoot()],
  exports: [RouterModule]
})
export class AppRoutingModule { }
