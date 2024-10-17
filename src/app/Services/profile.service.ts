import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { json, text } from 'body-parser';
import { Observable } from 'rxjs';

export interface ProfileDto {
  email: string;
  firstName: string;
  lastName: string;
  mobile: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = '/api/v1/user/profile'; // Adjust the URL as needed

  constructor(private http: HttpClient) { }

  getProfile(emailId: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${emailId}`);
  }
  updateProfile(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}`, data,{responseType: 'text'});
  }
  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
 
}