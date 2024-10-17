import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Race } from '../models/race';
import { PaymentDetails } from './details.service';


@Injectable({
  providedIn: 'root'
})
export class PublicRaceService {

  getCoursesByDateAndCountry(formattedDate: string, country: string) {
    throw new Error('Method not implemented.');
  }
  getRaceDetails(formattedDate: string, country: string, course: string, raceNumber: string, time: string) {
    throw new Error('Method not implemented.');
  }


  private baseUrl = '/api/public';

  constructor(private http: HttpClient,) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something went wrong; please try again later.');
  }

  getCountriesByDate(date: string): Observable<string[]> {
    const params = new HttpParams().set('date', date);
    return this.http.get<string[]>(`${this.baseUrl}/countries`, { params })
      .pipe(
        tap(data => console.log('Countries fetched:', data)),
        catchError(this.handleError)
      );
  }
  getCoursesByCountryAndDate(country: string, date: string): Observable<string[]> {
    const params = new HttpParams().set('country', country).set('date', date);
    return this.http.get<string[]>(`${this.baseUrl}/courses`, { params })
      .pipe(
        tap(data => console.log('Courses fetched:', data)),
        catchError(this.handleError)
      );
  }

  getRaceNumbersAndTimes(country: string, date: string, course: string): Observable<{ raceNumber: string, time: string }[]> {
    const params = new HttpParams().set('country', country).set('date', date).set('course', course);
    return this.http.get<{ raceNumber: string, time: string }[]>(`${this.baseUrl}/racenumbers`, { params })
      .pipe(
        tap(data => console.log('Race numbers and times fetched:', data)),
        catchError(this.handleError)
      );
  }

  getDetailsByCountryAndDateAndCourseAndRaceId(country: string, date: string, course: string, raceNumber: string): Observable<Race[]> {
    const params = new HttpParams().set('country', country).set('date', date).set('course', course).set('raceNumber', raceNumber);
    return this.http.get<Race[]>(`${this.baseUrl}/details`, { params })
      .pipe(
        tap(data => console.log('Race details fetched:', data)),
        catchError(this.handleError)
      );
  }
}
function switchMap(arg0: (payments: PaymentDetails[]) => any): import("rxjs").OperatorFunction<import("./details.service").PaymentDetails[], boolean> {
  throw new Error('Function not implemented.');
}