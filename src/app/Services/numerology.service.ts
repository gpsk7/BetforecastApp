import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailsService, PaymentDetails } from './details.service';
import { AuthService } from './auth.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Race } from '../models/race';

@Injectable({
  providedIn: 'root'
})
export class NumerologyService {

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

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Something went wrong; please try again later.';

    if (error.error instanceof ErrorEvent) {
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was:${JSON.stringify(error.error)}`)
    // Checking for the specific error message from the backend
        if (error.status === 404 && error.error?.message.includes('No nature of the day found')) {
            errorMessage = 'No nature of the day found for this date';
        } else if (error.error?.message) {
            errorMessage = error.error.message; 
        }
    }
    
    return throwError(errorMessage);
}


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
    let userid: any = this.authService.getUserID();
    const params = new HttpParams().set('date', date).set('userId', userid);

    return this.http.get<string[]>(`${this.baseUrl}/countries`, { params })
      .pipe(
        tap(data => console.log('Countries fetched:', data)),
        catchError(this.handleError)
      );
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
    return this.http.get<Race[]>(`${this.baseUrl}/details-numerology`, { params })
      .pipe(
        tap(data => console.log('Race details fetched:', data)),
        catchError(this.handleError)
      );
  }

}``

function switchMap(arg0: (payments: PaymentDetails[]) => any): import("rxjs").OperatorFunction<import("./details.service").PaymentDetails[], boolean> {
  throw new Error('Function not implemented.');
}
