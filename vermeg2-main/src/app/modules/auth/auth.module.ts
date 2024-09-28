import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';  // Correctly import HttpClientModule
import { SignInComponent } from './components/sign-in/sign-in.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SignUpComponent,
    SignInComponent,
    RecoverPasswordComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AuthRoutingModule,
  ],
  providers: [HttpClientModule]
})
export class AuthModule { }
