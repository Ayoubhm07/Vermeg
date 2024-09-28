import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/services/auth.guard';
import { QuestionDetailsComponent } from './modules/question/components/question-details/question-details.component';
export const routes: Routes = [
    {
        path: '',
       // canActivate: [AuthGuard],
        loadChildren: () =>
          import('./pages/layout/layout.module').then((m) => m.LayouttModule),
      },
      {
        //canActivate: [AuthGuard],
        path: 'question',
        loadChildren: () =>
          import('./modules/question/question.module').then((m) => m.QuestionModule),
      },
      { path: 'question/question-details/:idQuestion', component: QuestionDetailsComponent }


];



@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
