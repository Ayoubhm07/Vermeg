import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  userName : string | undefined ;
  listUsers : any[]=[];
  constructor(private router: Router , private service: userService) {
    this.userName = this.getUserNameFromLocalStorage();
   }

  ngOnInit(): void {
    this.getUserByDomain();
  }
  getUserNameFromLocalStorage(){
    let currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return currentUser?.username ;
  }

  getFirstLetter(userName: string): string {
    return userName ? userName.charAt(0).toUpperCase() : '';
  }

  logout(): void {
    // Clear the user data from localStorage
    localStorage.removeItem('currentUser');
    this.router.navigate(['/auth/sign-in']);
  }

  getUserByDomain(){
    this.service.getUsersByDomain().subscribe((res:any)=>{
        this.listUsers = res ;
        console.log(this.listUsers);

    })
  }

  extractRole(roleString: string): string {
    if (roleString && roleString.startsWith("ROLE_")) {
      return roleString.substring(5);
    }
    return '';
  }

}
