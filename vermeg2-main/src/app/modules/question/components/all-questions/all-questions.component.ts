import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../service/question-service.service';
import { Question } from '../../models/question.model';
import { Observable } from 'rxjs';
import { AnswerService } from '../../service/answer-service.service';
import { Answer } from '../../models/answer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-questions',
  templateUrl: './all-questions.component.html',
  styleUrls: ['./all-questions.component.scss']
})
export class AllQuestionsComponent implements OnInit {
  userInteractions = new Set<number>();
  questions: Question[] = [];
  showAnswers: { [key: number]: boolean } = {};
  answersDict: { [key: number]: Answer[] } = {};
  showDomainDropdown: boolean = false;  // Pour contrôler l'affichage de la liste des domaines
  selectedDomain: string = '';

  constructor(private router: Router, private service: QuestionService, private answerService:AnswerService) {
  }

  ngOnInit(): void {
    this.loadQuestions();
  }

  loadQuestions(): void {
    this.service.getQuestions().subscribe(
      (questions) => {
        this.questions = questions;
        this.questions.forEach(question => {
          this.showAnswers[question.idQuestion] = false; // Initialement, les réponses ne sont pas affichées
          this.answersDict[question.idQuestion] = []; // Initialiser le tableau de réponses pour chaque question
        });
      },
      (error) => {
        console.error('Error loading questions:', error);
      }
    );
  }
  handleSelectionChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Assertion de type
    const value = selectElement.value;

    if (value === 'newest') {
      this.getNewestQuestions();
    } else if (value === 'domain') {
      this.showDomainDropdown = true;
    }
  }

  getNewestQuestions(): void {
    this.service.getNewestQuestions().subscribe(
      (questions) => {
        this.questions = questions;
      },
      (error) => {
        console.error('Error loading newest questions:', error);
      }
    );
  }



  handleDomainSelection(event: Event): void {
    const select = event.target as HTMLSelectElement;  // Cast EventTarget to HTMLSelectElement
    const value = select.value;  // Now you can safely access .value

    if (!value) {
      console.error('No value selected.');
      return;
    }

    if (value === 'domain') {
      // Code to open another list or perform other actions
      console.log('Domain is selected, open the domain dropdown');
    } else {
      // Assume value is a valid domain to fetch
      this.service.getQuestionsByDomain(value).subscribe(
        questions => this.questions = questions,
        error => console.error('Failed to load questions for domain:', error)
      );
    }
  }


  toggleAnswers(questionId: number): void {
    this.showAnswers[questionId] = !this.showAnswers[questionId];
    if (this.showAnswers[questionId] && this.answersDict[questionId].length === 0) { // Chargement des réponses seulement si nécessaire
      this.answerService.getAnswersByQuestionId(questionId).subscribe(
        (answers) => {
          this.answersDict[questionId] = answers; // Stocker les réponses dans le dictionnaire
        },
        (error) => console.error('Error loading answers:', error)
      );
    }
  }

  increaseApprove(answerId: number): void {
    if (this.userInteractions.has(answerId)) {
        Swal.fire('Error', 'You have already made your decision on this answer.', 'error');
        return;
    }

    const answer = this.findAnswerById(answerId);
    if (answer) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to increase the approval of this answer?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, increase it!'
        }).then((result) => {
            if (result.isConfirmed) {
                answer.approve += 1;
                this.answerService.saveAnswer(answer).subscribe(
                    response => {
                        console.log('Approval increased', response);
                        this.userInteractions.add(answerId); // Ajoutez cet ID à l'ensemble des interactions
                        Swal.fire('Increased!', 'The approval has been increased.', 'success');
                    },
                    error => console.error('Error updating approval:', error)
                );
            }
        });
    }
}

decreaseApprove(answerId: number): void {
    if (this.userInteractions.has(answerId)) {
        Swal.fire('Error', 'You have already made your decision on this answer.', 'error');
        return;
    }

    const answer = this.findAnswerById(answerId);
    if (answer) {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to decrease the approval of this answer?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, decrease it!'
        }).then((result) => {
            if (result.isConfirmed) {
                answer.approve -= 1;
                this.answerService.saveAnswer(answer).subscribe(
                    response => {
                        console.log('Approval decreased', response);
                        this.userInteractions.add(answerId); // Ajoutez cet ID à l'ensemble des interactions
                        Swal.fire('Decreased!', 'The approval has been decreased.', 'success');
                    },
                    error => console.error('Error updating approval:', error)
                );
            }
        });
    }
}

  saveInteraction(answerId: number): void {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    interactions.push(answerId);
    localStorage.setItem('userInteractions', JSON.stringify(interactions));
}

loadInteractions(): void {
    const interactions = JSON.parse(localStorage.getItem('userInteractions') || '[]');
    this.userInteractions = new Set(interactions);
}


  private findAnswerById(id: number): Answer | undefined {
    // Parcourir toutes les clés de questionId dans answersDict
    for (const questionId in this.answersDict) {
      const answer = this.answersDict[questionId].find(a => a.idanswer === id);
      if (answer) {
        return answer;
      }
    }
    return undefined;
  }
  timeSinceAsked(questionTime: any) {
    const givenDate: Date = new Date(questionTime);

    const currentDate: Date = new Date();

    const differenceMs: number = currentDate.getTime() - givenDate.getTime();
    const differenceMinutes: number = Math.floor(differenceMs / (1000 * 60));

    const differenceHours: number = Math.floor(differenceMinutes / 60);
    const remainingMinutes: number = differenceMinutes % 60;

    return `${differenceHours} hours and ${remainingMinutes} minutes ago.`;
  }

  logout(): void {
    // Clear the user data from localStorage
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/sign-in']);
  }

  getUserNameFromLocalStorage(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser?.username ;
  }

  getFirstLetter(userName: string): string {
    return userName ? userName.charAt(0).toUpperCase() : '';
  }

}
