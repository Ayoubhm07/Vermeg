import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { QuestionRoutingModule } from './question-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AllQuestionsComponent } from './components/all-questions/all-questions.component';
import { QuestionDetailsComponent } from './components/question-details/question-details.component';
import { ChatComponent } from './components/chat/chat/chat.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    AllQuestionsComponent,
    AskQuestionComponent,
    QuestionDetailsComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    QuestionRoutingModule,
  ],
  providers: [ HttpClientModule]
})
export class QuestionModule { }
