// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute, Router } from '@angular/router';
// import { AuthService } from '../Services/auth.service';
// import { SnackbarService } from '../Services/snackbar.service';

// @Component({
//   selector: 'app-otp-verification',
//   templateUrl: './otp-verification.component.html',
//   styleUrls: ['./otp-verification.component.css']
// })
// export class OtpVerificationComponent implements OnInit {
//   email: string = '';
//   otp: string = '';
//   verificationMessage: string = '';
//   resendMessage: string = '';
//   isResending: boolean = false;

//   constructor(
//     private authService: AuthService,
//     private router: Router,
//     private route: ActivatedRoute,
//     private snackbarService: SnackbarService
//   ) {}

//   ngOnInit(): void {
//     this.route.queryParams.subscribe(params => {
//       this.email = params['email'] || '';
//       console.log(this.email)
//     });
//   }

//   onSubmit() {
//     if (this.otp) {
//       this.authService.verifyOTP(this.email, this.otp).subscribe(
//         (response) => {
//           console.log('OTP verification successful', response);
//           this.verificationMessage = 'OTP verification successful';
//           this.snackbarService.show(response.message);
//           this.router.navigate(['/login']); // Navigate to login page
//         },
//         (error) => {
//           console.error('OTP verification failed', error);
//           this.snackbarService.show(error.message);
//           this.verificationMessage = 'OTP verification failed. Please try again.';
//         }
//       );
//     } else {
//       this.verificationMessage = 'Please enter the OTP.';
//       this.snackbarService.show('Please enter the OTP.');
//     }
//   }

//   onResendOTP() {
//     this.isResending = true;
//     this.authService.resendOTP(this.email).subscribe(
//       (response) => {
//         this.resendMessage = 'OTP has been resent successfully.';
//         this.isResending = false;
//       },
//       (error) => {
//         this.resendMessage = 'Failed to resend OTP. Please try again.';
//         this.isResending = false;
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { SnackbarService } from '../Services/snackbar.service';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit {
  email: string = '';
  otp: string = '';
  verificationMessage: string = '';
  resendMessage: string = '';
  isResending: boolean = false;
  isVerifing =false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || '';
      console.log(this.email)
    });
  }

  onSubmit() {
    this.isVerifing =true;
    if (this.otp) {
      this.authService.verifyOTP(this.email, this.otp).subscribe(
        (response) => {
          this.isVerifing =false;
          console.log('OTP verification successful', response);
          this.snackbarService.show(response.message || 'OTP verification successful');
          this.router.navigate(['/login']); // Navigate to login page
        },
        (error) => {
          this.isVerifing =false;
          console.error('OTP verification failed', error);
          const errorMessage = error.error?.message || 'OTP verification failed. Please try again.';
          this.snackbarService.show(errorMessage);
        }
      );
    } else {
      this.isVerifing =false;
      this.snackbarService.show('Please enter the OTP.');
    }
  }

  onResendOTP() {
    this.isResending = true;
    this.authService.resendOTP(this.email).subscribe(
      (response) => {
        this.snackbarService.show(response.message || 'OTP has been resent successfully.');
        this.isResending = false;
      },
      (error) => {
        console.error('Failed to resend OTP', error);
        const errorMessage = error.error?.message || 'Failed to resend OTP. Please try again.';
        this.snackbarService.show(errorMessage);
        this.isResending = false;
      }
    );
  }
}

