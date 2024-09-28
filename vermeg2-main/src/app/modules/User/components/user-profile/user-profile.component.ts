import { Component, OnInit } from '@angular/core';
import { userService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
 userName : string | undefined ;
 listQuestions : any[]=[];
constructor(private router: Router, private service: userService) {
  this.userName = this.getUserNameFromLocalStorage();

}

  ngOnInit(): void {
    this.getQuestionsByUser();
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

getQuestionsByUser(){
  this.service.getUserQuestions().subscribe((res:any)=>{
      this.listQuestions = res ;
  })
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

}
