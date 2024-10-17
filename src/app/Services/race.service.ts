import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Race } from '../models/race';
import { NameCount } from '../models/name-count.model';
import { DetailsService, PaymentDetails } from './details.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RaceService {
  snackbarService: any;
  getCoursesByDateAndCountry(formattedDate: string, country: string) {
    throw new Error('Method not implemented.');
  }
  getRaceDetails(formattedDate: string, country: string, course: string, raceNumber: string, time: string) {
    throw new Error('Method not implemented.');
  }

  private baseUrl = '/api/races';
  private apiUrl = '/api/v1/nature';

  constructor(private http: HttpClient,
    private detailsService: DetailsService,
    private authService: AuthService) { }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('A client-side or network error occurred:', error.error.message);
  //   } else {
  //     console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
  //   }
  //   return throwError('Something went wrong; please try again later.');
  // }

  getNatureDayValue(date: string): Observable<any>{
    // let userid: any = this.authService.getUserID();
    const params=new HttpParams().set('date', date).set('responseType',"text");

    return this.http.get<any>(`${this.apiUrl}`, {params})
    .pipe(
      tap(
        data => console.log('natureofdayvalue fetched:', data)),
        catchError(this.handleError)
      );
  }
  getCountriesByDate(date: string): Observable<string[]> {
    let userid: any = this.authService.getUserID(); // Get user ID
    const params = new HttpParams()
      .set('date', date)
      .set('userId', userid)
      .set('responseType', 'json');

    return this.http.get<string[]>(`${this.baseUrl}/countries`, { params })
      .pipe(
        tap(data => console.log('Countries fetched:', data)) // Log the fetched data
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage: string;
    // Check for a server error response
    if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Client-side error: ${error.error.message}`;
    } else {
        // Server-side error
        errorMessage = `Server-side error: ${error.status} - ${error.error?.message || error.message || 'An unexpected error occurred.'}`;
    }
    // Log the error message for debugging
    console.error(errorMessage);

    // Show the error message in a snackbar
    this.snackbarService.showError(errorMessage);
    // Throw an error observable with a user-friendly message
    return throwError(() => new Error(errorMessage));
  }


  getCoursesByCountryAndDate(country: string, date: string): Observable<string[]> {
    let userid: any = this.authService.getUserID();
    const params = new HttpParams().set('country', country).set('date', date).set('userId', userid);
    return this.http.get<string[]>(`${this.baseUrl}/courses`, { params })
      .pipe(
        tap(data => console.log('Courses fetched:', data)),
        catchError(this.handleError)
      );
  }

  getRaceNumbersAndTimes(country: string, date: string, course: string): Observable<{ raceNumber: string, time: string }[]> {
    let userid: any = this.authService.getUserID();
    const params = new HttpParams().set('country', country).set('date', date).set('course', course).set('userId', userid);
    return this.http.get<{ raceNumber: string, time: string }[]>(`${this.baseUrl}/racenumbers`, { params })
      .pipe(
        tap(data => console.log('Race numbers and times fetched:', data)),
        catchError(this.handleError)
      );
  }

  getDetailsByCountryAndDateAndCourseAndRaceId(country: string, date: string, course: string, raceNumber: string): Observable<Race[]> {
    let userid: any = this.authService.getUserID();
    const params = new HttpParams().set('country', country).set('date', date).set('course', course).set('raceNumber', raceNumber).set('userId', userid);
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

