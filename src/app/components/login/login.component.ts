// import { HttpClient } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../Services/auth.service';
// import { trigger, state, style, transition, animate } from '@angular/animations';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   animations: [
//     trigger('fadeIn', [
//       state('void', style({ opacity: 0 })),
//       transition(':enter', [
//         animate('1s ease-in-out', style({ opacity: 1 }))
//       ])
//     ])
//   ]
// })

// export class LoginComponent {

//   user: {
//     email: string;
//     password: string;
//   } = {
//       email: '',
//       password: '',
//     };
//   errorMessage!: string;
//   constructor(private authService: AuthService, private router: Router) { }

//   OnRegister() {
//     this.router.navigate(['/register'])
//   }
//   onSubmit() {
//     if (this.validateForm()) {
//       this.authService.login(this.user).subscribe(
//         (response) => {
//           console.log('login successful', response);
//           this.router.navigate(['/home']);
//         },
//         (error) => {
//           console.error('Login failed', error);
//           if (error.status === 401) {
//             this.errorMessage = 'Invalid email or password';
//           } else {
//             this.errorMessage = 'An error occurred. Please try again later.';
//           }
//         }
//       );
//     }
//   }
//   private validateForm(): boolean {

//     return true;
//   }

// }
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SnackbarService } from '../../Services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('1s ease-in-out', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class LoginComponent {
  isLoading = false;

  user: {
    email: string;
    password: string;
  } = {
      email: '',
      password: '',
    };
  errorMessage!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackbarService: SnackbarService
  ) { }

  OnRegister() {
    this.router.navigate(['/register']);
  }

  onForgotPassword() {
    // Navigate to forgot password component
    this.router.navigate(['/forgot-password']); // Adjust route as needed
  }

  
  onSubmit() {
    if (this.validateForm()) {
      this.isLoading = true;
      this.authService.login(this.user).subscribe(
        (response) => {
          this.isLoading=false
          console.log('login successful', response);
          this.snackbarService.show('Login SuccessFull');
          this.router.navigate(['/home']);
        },
        (error) => {
          this.isLoading=false
          console.error('Login failed', error);
          if (error.status === 401) {
            this.snackbarService.show('Invalid email or password');
          } else {
            this.snackbarService.show('Bad Credentials.');
          }
        }
      );
    } else {
      this.isLoading=false
      this.snackbarService.show('Please fill all required fields');
    }
  }

  private validateForm(): boolean {
    return this.user.email !== '' && this.user.password !== '';
  }
}
