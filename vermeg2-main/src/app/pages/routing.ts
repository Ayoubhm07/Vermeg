import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./../modules/user-management/user-management.module').then((m) => m.UserManagementModule),
  } , {
    path: '',
    redirectTo: 'users/list-users',
    pathMatch: 'full',
  },
]

export { Routing };
