import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';


const routes: Routes = [
  { path: 'sign-up', component: SignUpComponent },
  { path: 'recover-password/sign-in', component: SignUpComponent },
  { path: 'sign-in', component: SignInComponent },
  {path: 'recover-password', component: RecoverPasswordComponent},
  { path: '', redirectTo: '/sign-up', pathMatch: 'full' },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class AuthRoutingModule { }
