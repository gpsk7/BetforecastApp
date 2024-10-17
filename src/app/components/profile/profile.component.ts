import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/auth.service';
import { ProfileService } from 'src/app/Services/profile.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileForm: FormGroup;
  route: any;
  emailId = this.authService.getUserID();
  dataSource: any;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private authService: AuthService,
    private snackbarService: SnackbarService
  ) {
    this.profileForm = this.fb.group({
      email: [''],
      firstName: [''],
      lastName: [''],
      mobile: ['']

    });
  }
  ngOnInit(): void {
    this.loadProfileDetails();
  }
  loadProfileDetails() {
    this.profileService.getProfile(this.emailId).subscribe(
      data => {
        this.profileForm.patchValue(data);
      },
      error => {
        console.error('Error fetching data:', error);
        this.snackbarService.show("No Data");
      }
    );
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.profileService.updateProfile(this.profileForm.value).subscribe(
        response => {
          console.log('Profile updated successfully:', response);
          this.snackbarService.show('Updated successfully');
        },
        error => {
          console.error('Error updating profile:', error);
        }
      );
    } else {
      console.error('Form is not valid.');
    }
  }
}
