import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
//import {questionService} from 'src/app/modules/question/service/question.service';
import Swal from 'sweetalert2';
import { QuestionService } from '../../service/question-service.service';
import { Observable, switchMap } from 'rxjs';
import { Question } from '../../models/question.model';
import { AnswerService } from '../../service/answer-service.service';
import { Answer } from '../../models/answer.model';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.scss']
})
export class QuestionDetailsComponent implements OnInit {
  answerForm!: FormGroup;
  question?: Question;
  time: any;
  questionId : any ;
  userName : string | undefined ;
  private router: Router = new Router;

  constructor(private fb: FormBuilder,private route: ActivatedRoute, private service: QuestionService, private answerService: AnswerService
  ) {
    this.answerForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
        const id = params.get('idQuestion');
        console.log('ID from URL:', id); // Vérifiez que vous obtenez bien l'ID ici
        if (!id) {
            throw new Error('Question ID is missing in the route parameters.');
        }
        this.questionId = +id;
        console.log('Assigned Question ID:', this.questionId);

        this.service.getQuestionById(this.questionId).subscribe(
            question => {
                this.question = question;
                console.log('Loaded Question:', this.question);
            },
            error => console.error('Failed to load the question:', error)
        );
    });
}

  timeAsked(quest: any) {
    const givenDate: Date = new Date(quest.dateTime);

    const currentDate: Date = new Date();

    const differenceMs: number = currentDate.getTime() - givenDate.getTime();
    const differenceMinutes: number = Math.floor(differenceMs / (1000 * 60));

    const differenceHours: number = Math.floor(differenceMinutes / 60);
    const remainingMinutes: number = differenceMinutes % 60;

    return `${differenceHours} hours and ${remainingMinutes} minutes ago.`;
  }

  addAnswer(): void {
    const newAnswer: Answer = {
        description: this.answerForm.value.content,
        userId: '2',
        approve: 0,
        date: new Date(),
        questionId: this.questionId,
        idanswer: 0
    };

    this.answerService.saveAnswer(newAnswer).subscribe(
        response => {
            console.log('Answer saved successfully', response);
            Swal.fire({
                title: 'Thank you for your time!',
                text: 'Response added!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.router.navigate(['/all-questions']); // Assurez-vous que le chemin est correct
                }
            });
        },
        error => {
            console.error('Failed to save the answer:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to save the answer.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    );
}

  logout(): void {
    localStorage.removeItem('currentUser');
  }

  getUserNameFromLocalStorage(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser?.username ;
  }

  getFirstLetter(userName: string): string {
    return userName ? userName.charAt(0).toUpperCase() : '';
  }

}
