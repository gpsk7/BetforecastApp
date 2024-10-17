import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiUrl = '/api/v1/auth/forgotPassword'; // Your backend API URL

  constructor(private http: HttpClient) {}

  // forgotPassword(request: { userId: string }): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/forgot-password`, request);
  // }
  forgotPassword(data: { userId: string }): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/forgot-password`, data, { responseType: 'text' as 'json' });
  }

  // Method to request a new OTP
  // resendOtp(email: string): Observable<any> {
  //   return this.http.post(`${this.apiUrl}/resend-otp`, { email });
  // }

  resendOtp(userId: string): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/resend-otp`, { userId }, { responseType: 'text' as 'json' });
  }

  requestOtp(userId: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/forgot-password`, { userId });
  }

  verifyOtp(userId: string, otp: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/verify-otp`, { userId, otp }, { responseType: 'text' as 'json' });
  }

  changePassword(userId: string, newPassword: string, repeatPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/change-password`, { userId, newPassword, repeatPassword }, { responseType: 'text' as 'json' });
  }
}
