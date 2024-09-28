import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../sign-in/service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup;

  constructor(private router: Router, private service: AuthenticationService) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  signUp() {
    this.service.signUp(this.signUpForm.value).subscribe((res) => {
      if(res){
        this.router.navigateByUrl('/auth/sign-in');
      }
    });
  }

  goToSignIn(){
    this.router.navigateByUrl('/auth/sign-in');
  }

}
