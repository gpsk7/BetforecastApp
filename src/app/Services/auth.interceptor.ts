// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { AuthService } from './auth.service'; // Adjust path as necessary
// import { Router } from '@angular/router';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private authService: AuthService,private router:Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     // Get the JWT token from AuthService
//     const token = this.authService.getToken();

//     if (token) {
//       if (this.authService.isTokenExpired(token)) {
//         this.authService.logout();
//         this.router.navigate(['/login']);
//         return throwError(() => new Error('Token expired'));
//       }
//     }
//     // Clone the request and add the Authorization header if token exists
//     const authReq = token
//       ? req.clone({
//           setHeaders: {
//             Authorization: `Bearer ${token}`
//           }
//         })
//       : req;

//     // Handle the request and catch any errors
//     return next.handle(authReq).pipe(
//       catchError((error: HttpErrorResponse) => {
//         if (error.status === 401) {
//           // Handle unauthorized access, e.g., logout or redirect to login
//           this.authService.logout();
//         }
//         return throwError(error);
//       })
//     );
//   }
// }

import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Adjust the path as necessary
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  private readonly publicEndpoints: string[] = [
    '/api/v1/auth/register',
    '/api/v1/auth/login',
    'https://www.googleapis.com',
    '/api/v1/auth/verify-otp',
    '/api/v1/auth/resend-otp',
    '/api/v1/auth/forgotPassword/forgot-password',
    '/api/v1/auth/forgotPassword/verify-otp',
    '/api/v1/auth/forgotPassword/resend-otp',
    '/api/v1/auth/forgotPassword/change-password'
    // Add other public endpoints here
  ];

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Check if the request URL matches any of the public endpoints
    const isPublicEndpoint = this.publicEndpoints.some(endpoint => req.url.includes(endpoint));

    // If it's a public endpoint, proceed without adding the token
    if (isPublicEndpoint) {
      return next.handle(req);
    }

    // Get the JWT token from AuthService
    const token = this.authService.getToken();

    // If the token is expired, logout and redirect to the login page
    if (token && this.authService.isTokenExpired(token)) {
      this.authService.logout();
      this.router.navigate(['/login']);
      return throwError(() => new Error('Token expired'));
    }

    // Clone the request and add the Authorization header if the token exists
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
      : req;

    // Handle the request and catch any errors
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle unauthorized access, e.g., logout or redirect to login
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        return throwError(error);
      })
    );
  }
}
