import { Component } from '@angular/core';
import { ForgotPasswordService } from '../../Services/forgot-password-service.service'; // Ensure the path is correct
import { ActivatedRoute, Router } from '@angular/router';
import { SnackbarService } from 'src/app/Services/snackbar.service'; // Ensure this path is correct

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  newPassword: string = '';
  repeatPassword: string = '';
  userEmail: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  passwordsDoNotMatch: boolean = false;
  showPassword: boolean = false;

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

  validatePasswords() {
    this.passwordsDoNotMatch = this.newPassword !== this.repeatPassword;
  }

  onSubmit() {
    if (this.newPassword !== this.repeatPassword) {
      this.passwordsDoNotMatch = true;
      return;
    }

    this.passwordsDoNotMatch = false;

    this.forgotPasswordService.changePassword(this.userEmail, this.newPassword, this.repeatPassword).subscribe(
      (response: any) => {
        this.successMessage = response.message || 'Password changed successfully.'; 
        this.errorMessage = '';
        console.log(this.successMessage);
        this.snackbarService.show(this.successMessage); 
        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.errorMessage = error.error?.message || 'Failed to change password.';
        this.successMessage = '';
        console.error(this.errorMessage);
        this.snackbarService.show(this.errorMessage); 
      }
    );
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
