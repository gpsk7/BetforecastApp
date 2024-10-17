// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../Services/auth.service';
// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegistrationComponent {
//   user: {
//     confirmPassword: String;
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//     mobile: string;

//   } = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       mobile: '',
//       confirmPassword: ''
//     };

//   registrationMessage: string = 'RegistrationSuccesful';
//   showPassword: any;

//   constructor(private authService: AuthService, private router: Router) { }

//   onSubmit() {
//     if (this.validateForm()) {
//       this.authService.register(this.user).subscribe(
//         (response) => {
//           console.log('Registration successful', response);
//           this.registrationMessage = 'Registration successful';
//           this.router.navigate(['/login']);
//         },
//         (error) => {
//           console.error('Registration failed', error);
//         }
//       );
//     }
//   }

//   private validateForm(): boolean {
//     return true;
//   }

//   login() {
//     this.router.navigate(['/login'])
//   }

//   get passwordsMatch(): boolean {
//     return this.user.password === this.user.confirmPassword;
//   }

//   public togglePasswordVisibility(): void {
//     this.showPassword = !this.showPassword;
//   }
// }

// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../Services/auth.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegistrationComponent {
//   user = {
//     confirmPassword: '',
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     mobile: ''
//   };

//   registrationMessage: string = '';
//   showPassword: boolean = false;

//   constructor(private authService: AuthService, private router: Router) { }

//   onSubmit() {
//     console.log('User data before registration:', this.user); // Log user data before registration

//     if (this.validateForm()) {
//       this.authService.register(this.user).subscribe(
//         (response) => {
//           console.log('Registration successful', response);
//           this.registrationMessage = 'Registration successful';
//           console.log('User data after registration:', this.user); // Log user data after registration
//           this.router.navigate(['/login']);
//         },
//         (error) => {
//           console.error('Registration failed', error);
//           this.registrationMessage = 'Registration failed. Please try again.';
//         }
//       );
//     } else {
//       console.log('Form validation failed');
//       this.registrationMessage = 'Please correct the form errors.';
//     }
//   }

//   private validateForm(): boolean {
//     // Add actual validation logic if needed
//     if (!this.user.firstName || !this.user.lastName || !this.user.email ||
//         !this.user.password || !this.user.mobile || !this.passwordsMatch) {
//       return false;
//     }
//     return true;
//   }

//   login() {
//     this.router.navigate(['/login']);
//   }

//   get passwordsMatch(): boolean {
//     return this.user.password === this.user.confirmPassword;
//   }

//   public togglePasswordVisibility(): void {
//     this.showPassword = !this.showPassword;
//   }
// }


import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { response } from 'express';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegistrationComponent {
  isRegistering = false;

  user = {
    confirmPassword: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    mobile: ''
  };

  registrationMessage: string = '';
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router, private snackbarService: SnackbarService) { }

  onSubmit() {
    this.isRegistering = true;
    console.log('User data before registration:', this.user); // Log user data before registration

    if (this.validateForm()) {
      this.authService.register(this.user).subscribe(
        (response) => {
          this.isRegistering = false;
          console.log('Registration successful', response);
          this.registrationMessage = 'Registration successful';
          this.snackbarService.show(response.message);
          console.log('User data after registration:', this.user); // Log user data after registration
          this.router.navigate(['/verify-otp'], { queryParams: { email: this.user.email } }); // Navigate to OTP verification page
        },
        (error) => {
          this.isRegistering = false;
          console.error('Registration failed', error);
          const errorMessage = this.getErrorMessage(error);
          this.snackbarService.show(errorMessage);
        }
      );
    } else {
      this.isRegistering = false;
      console.log('Form validation failed');
      this.snackbarService.show('Please correct the form errors.');
    }
  }
  private getErrorMessage(error: any): string {
    if (error.error && typeof error.error === 'string') {
      return error.error;
    } else if (error.error && error.error.message) {
      return error.error.message;
    } else if (error.message) {
      return error.message;
    } else {
      return 'Registration failed. Please try again.';
    }
  }

  private validateForm(): boolean {
    if (!this.user.firstName || !this.user.lastName || !this.user.email ||
        !this.user.password || !this.user.mobile || !this.passwordsMatch) {
      return false;
    }
    return true;
  }

  login() {
    this.router.navigate(['/login']);
  }

  get passwordsMatch(): boolean {
    return this.user.password === this.user.confirmPassword;
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}

