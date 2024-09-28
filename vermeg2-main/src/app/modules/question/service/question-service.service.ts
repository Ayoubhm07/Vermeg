import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private apiUrl = 'http://localhost:8080/question';

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // Assuming token is stored in local storage
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/all`, { headers: this.getHeaders() });
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.apiUrl}/get/${id}`, { headers: this.getHeaders() });
  }

  saveQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(`${this.apiUrl}/save`, question, { headers: this.getHeaders() });
  }

  deleteQuestion(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }

  getNewestQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/newest`, { headers: this.getHeaders() });
  }

  getQuestionsByDomain(domain: string): Observable<Question[]> {
    return this.http.get<Question[]>(`${this.apiUrl}/domains/${domain}`, { headers: this.getHeaders() });
  }
}
