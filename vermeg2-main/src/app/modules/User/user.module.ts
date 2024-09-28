import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {UserRoutingModule} from './user-routing.module'
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ListComponent } from './components/list/list.component';


@NgModule({
  declarations: [
    UserProfileComponent,
    NotificationComponent,
    ListComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
  ],
  providers: [ HttpClientModule]
})
export class UserModule { }
