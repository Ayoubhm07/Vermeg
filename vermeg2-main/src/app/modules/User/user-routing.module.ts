import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotificationComponent } from './components/notification/notification.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent },
    {path: 'notification', component: NotificationComponent},
     {path: 'list-user', component: ListComponent},
  { path: '', redirectTo: '/user-profile', pathMatch: 'full' },

];


@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class UserRoutingModule { }
