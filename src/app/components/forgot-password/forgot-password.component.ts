import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../../Services/forgot-password-service.service'; // Adjust path if necessary
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string = '';
  message: string = '';
  errorMessage: string = '';
  isSendingOtp =false;

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.email = params['userId'] || '';
      console.log(this.email);
    });
  }

  // Method to handle forgot password request
  onForgotPassword() {
    this.isSendingOtp=true;
    console.log('Sending forgot password request for email:', this.email);
    this.forgotPasswordService.forgotPassword({ userId: this.email }).subscribe(
      response => {
        this.isSendingOtp=false;
        console.log('OTP sent successfully:', response);
        this.message = 'OTP has been sent to your email.';
        this.errorMessage = '';
        this.snackbarService.show(this.message);
        this.router.navigate(['/forgot-otp-verify'], { queryParams: { userId: this.email } });
      },
      error => {
        this.isSendingOtp=false;
        console.error('Failed to send OTP:', error);
        this.errorMessage = error.error.message || 'Email Not Found.';
        this.snackbarService.show(this.errorMessage); 
      }
    );
  }
}
