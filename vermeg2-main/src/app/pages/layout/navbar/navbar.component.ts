import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  screenWidth!: number;
  public isExpanded: boolean = false;

  constructor(private router: Router) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    this.isExpanded = this.screenWidth <= 959;
  }

  ngOnInit(): void {
    this.getActiveMenu();
  }

  /*** Get menu active */
  getActiveMenu() {
    let link_a = document.querySelectorAll('.menu-g');
    for (let i = 0; i < link_a.length; ++i) {
      // Handle active menu logic
    }
  }

  toggleMenu() {
    this.isExpanded = !this.isExpanded;
  }

  navigateToUserProfile() {
    this.router.navigate(['auth/sign-in']);
  }

  toggleSubMenu(event: Event) {
    const menuItem = (event.currentTarget as HTMLElement).closest('.menu-item');
    if (menuItem) {
      menuItem.classList.toggle('active');
    }
  }
}
