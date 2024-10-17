import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json } from 'express';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Amount {
  id: number;
  value: number;
}

@Injectable({
  providedIn: 'root'
})
export class AmountService {
 
  private apiUrl = '/api/v1/amount';


  constructor(private http: HttpClient) { }
  createAmount(value: number): Observable<any> {
    const payload = { value };
    return this.http.post(this.apiUrl, payload, { responseType: 'text' }) 
      .pipe(
        map(response => {
          // Convert the plain text response to a JSON object
          return { message: response };
        }),
        catchError(error => {
          // Handle errors and convert them to a JSON object
          return of({ message: 'Error saving amount' });
        })
      );
  }

  getAmount(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
