import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../../Services/forgot-password-service.service'; // Update this path if necessary
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service'; // Ensure this path is correct

@Component({
  selector: 'app-forgot-otp-verify',
  templateUrl: './forgot-otp-verify.component.html',
  styleUrls: ['./forgot-otp-verify.component.css']
})
export class ForgotOtpVerifyComponent implements OnInit {
  otp: string = '';
  userEmail: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  isVerifyingOtp=false;
  isResending=false;
  

  constructor(
    private forgotPasswordService: ForgotPasswordService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService // Inject SnackbarService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userEmail = params['userId'] || '';
      console.log(this.userEmail);
    });
  }

  onSubmit() {
    this.isVerifyingOtp=true;

    this.forgotPasswordService.verifyOtp(this.userEmail, this.otp).subscribe(
      (response: any) => {
        this.isVerifyingOtp=false;
        this.successMessage = response.message || 'OTP verified. You can reset your password now.'; // Extract message from response
        this.errorMessage = '';
        console.log(this.successMessage);
        this.snackbarService.show(this.successMessage); 
        this.router.navigate(['/change-password'], { queryParams: { userId: this.userEmail } });
      },
      (error: any) => {
        this.isVerifyingOtp=false;
        this.errorMessage = error.error?.message || 'Failed to verify OTP.';
        this.successMessage = '';
        console.error(this.errorMessage);
        this.snackbarService.show(this.errorMessage); 
      }
    );
  }

  onResendOtp() {
    this.isResending=true;
    this.forgotPasswordService.resendOtp(this.userEmail).subscribe(
      (response: any) => {
        this.isResending=false;
        this.successMessage = response.message || 'OTP has been resent to your email.'; 
        this.errorMessage = '';
        console.log(this.successMessage);
        this.snackbarService.show(this.successMessage); 
      },
      (error: any) => {
        this.isResending=false;
        this.errorMessage = error.error?.message || 'Failed to resend OTP.';
        this.successMessage = '';
        console.error(this.errorMessage);
        this.snackbarService.show(this.errorMessage);
      }
    );
  }
}
