import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionService } from '../../service/question-service.service';
import Swal from 'sweetalert2';
import { Question } from '../../models/question.model';
import { AnswerService } from '../../service/answer-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.scss']
})
export class AskQuestionComponent implements OnInit {
  askQuestionForm!: FormGroup;
  userName : string | undefined ;
  questions: Question[] = [];
  private router: Router = new Router;


  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private answerService:AnswerService
  ) {}

  ngOnInit(): void {
    console.log("AppComponent initialized");
    this.askQuestionForm = new FormGroup({
      titre: new FormControl('', [Validators.required]),
      domain: new FormControl(''),
      descripition: new FormControl('', [Validators.required])
    });

    this.loadQuestions();

  }

  loadQuestions(): void {
    this.questionService.getQuestions().subscribe(questions => {
      this.questions = questions;
    });
  }

  saveQuestion(): void {
    if (this.askQuestionForm.valid) {
      console.log("Description:", this.askQuestionForm.get('description')?.value);

      const newQuestion: Question = {
        descripition: this.askQuestionForm.get('descripition')?.value, // Assurez-vous que c'est bien 'description'
        domain: this.askQuestionForm.get('domain')?.value,
        userId: '2',
        date: new Date(),
        idQuestion: 0
      };

      this.questionService.saveQuestion(newQuestion).subscribe(
        response => {
          console.log('Question saved successfully', response);
          // SweetAlert pour confirmer la sauvegarde et rediriger
          Swal.fire({
            title: 'Success!',
            text: 'Your question has been added successfully.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then((result) => {
            if (result.value) {
              this.router.navigate(['/all-questions']); // Assurez-vous que le chemin est correct
            }
          });
        },
        error => {
          console.error('Error saving question', error);
          // SweetAlert en cas d'erreur
          Swal.fire({
            title: 'Error!',
            text: 'Failed to save your question.',
            icon: 'error',
            confirmButtonText: 'OK'
          });
        }
      );
    } else {
      // Gérer le cas où le formulaire n'est pas valide
      Swal.fire({
        title: 'Invalid Form!',
        text: 'Please fill out the form correctly.',
        icon: 'warning',
        confirmButtonText: 'OK'
      });
    }
  }



  // extractKeywords(keywordString: string): string[] {
  //   keywordString = keywordString.trim();

  //   const keywords = keywordString.split(",");

  //   const trimmedKeywords = keywords.map(keyword => keyword.trim());

  //   return trimmedKeywords;
  // }

  // logout(): void {
  //   localStorage.removeItem('currentUser');
  //   this.router.navigate(['/auth/sign-in']);
  // }

  // getUserNameFromLocalStorage(){
  //   let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
  //   return currentUser?.username ;
  // }

  // getFirstLetter(userName: string): string {
  //   return userName ? userName.charAt(0).toUpperCase() : '';
  // }
}
