import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/v1/auth';
  private jwtHelper!: JwtHelperService;

  constructor(private httpClient: HttpClient, private injector: Injector) {}

  private getJwtHelperService(): JwtHelperService {
    if (!this.jwtHelper) {
      this.jwtHelper = this.injector.get(JwtHelperService);
    }
    return this.jwtHelper;
  }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: { token: string, userID: string, role: string }) => {
        localStorage.setItem('userID', response.userID);
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
      })
    );
  }

  register(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
  }): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/register`, user);
  }

  verifyOTP(userId: string, otp: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/verify-otp`, { userId, otp });
  }

  resendOTP(userId: string): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/resend-otp`, { userId });
  }

  isTokenExpired(token: string): boolean {
    return this.getJwtHelperService().isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserID(): string | null {
    return localStorage.getItem('userID');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isAdminLoggedIn(): boolean{
    return localStorage.getItem('role') == "ADMIN" ;
   }
}

