import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { Routing } from '../routing';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component:NavbarComponent,
    children: [  {
      path: 'users',
      loadChildren: () =>
        import('../../modules/user-management/user-management.module').then((m) => m.UserManagementModule),
    }]
  }
];
@NgModule({
  declarations: [
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)



  ]
})
export class LayouttModule { }
