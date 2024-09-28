import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Answer } from '../models/answer.model'; // Importez la classe Answer

@Injectable({
  providedIn: 'root'
})
export class AnswerService {
  private apiUrl = 'http://localhost:8080/answer';
  private authUrl = 'http://localhost:8080/api/auth/oauth2/success';

  constructor(private http: HttpClient) { }

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


  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  getAnswerById(id: number): Observable<Answer> {
    return this.http.get<Answer>(`${this.apiUrl}/get/${id}`, { headers: this.getHeaders() });
  }

  saveAnswer(answer: Answer): Observable<Answer> {
    return this.http.post<Answer>(`${this.apiUrl}/save`, answer, { headers: this.getHeaders() });
  }

  deleteAnswer(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }

  getAnswersByQuestionId(id: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/byquestion/${id}`, { headers: this.getHeaders() });
  }

  getAnswersByApproved(id: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/byapproved/${id}`, { headers: this.getHeaders() });
  }

  getAnswersByDate(id: number): Observable<Answer[]> {
    return this.http.get<Answer[]>(`${this.apiUrl}/newest/${id}`, { headers: this.getHeaders() });
  }
}
