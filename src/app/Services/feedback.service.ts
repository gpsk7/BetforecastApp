import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Feedback {
  name: string;
  email: string;
  rating: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private apiUrl = '/api/races';

  constructor(private http: HttpClient) { }
  saveFeedback(feedback: Feedback): Observable<Feedback> {
    return this.http.post<Feedback>(`${this.apiUrl}/feedback`,  feedback);
  }
}
