import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnswerService } from './modules/question/service/answer-service.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  private authUrl = 'http://localhost:8080/api/auth/oauth2/success';

  constructor(private http: HttpClient) { }




  ngOnInit() {
    console.log("AppComponent initialized");
    this.getAndStoreToken();
  }

  getAndStoreToken(): void {
    this.http.get<string>(this.authUrl, { responseType: 'text' as 'json' })
      .pipe(
        tap(token => {
          console.log("Received token:", token);
          if (token) {
            localStorage.setItem('token', token);
          } else {
            console.error('No token received');
          }
        })
      )
      .subscribe(
        () => console.log('Token is stored in localStorage'),
        error => console.error('Error during token retrieval', error)
      );
  }
}
