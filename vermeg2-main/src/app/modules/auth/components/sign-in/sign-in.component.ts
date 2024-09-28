import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from './service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  loginform!: FormGroup;

  constructor(private router: Router, private service: AuthenticationService) {}

  ngOnInit(): void {
    this.loginform = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    this.service.login(this.loginform.value).subscribe((res) => {
      localStorage.setItem('currentUser', JSON.stringify(res));
      localStorage.setItem('domaine', res.domaine);
      localStorage.setItem('id', res.id);

      this.router.navigateByUrl('/question/all-questions');
    });
  }
}
