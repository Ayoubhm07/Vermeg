import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllQuestionsComponent } from './components/all-questions/all-questions.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { ChatComponent } from './components/chat/chat/chat.component';


const routes: Routes = [
  { path: 'all-questions', component: AllQuestionsComponent },
  { path: 'ask-question', component: AskQuestionComponent },
  { path: 'question-details/:idQuestion', component: QuestionDetailsComponent },
  { path: 'chat', component: ChatComponent},
  { path: '', redirectTo: '/all-questions', pathMatch: 'full' },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class QuestionRoutingModule { }
