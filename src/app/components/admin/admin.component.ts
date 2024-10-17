import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  isSidenavOpen = true;

  constructor(private router: Router) { }

  navigateToHorseMaster() {
    this.router.navigate(['/horseMaster']);
  }
  navigateToJockeyMaster() {
    this.router.navigate(['/jockeyMaster']);
  }
  navigateToTrainerMaster() {
    this.router.navigate(['/trainerMaster']);
  }
  navigateToAllPayments() {
    this.router.navigate(['/paymentDetails']);
  }
  navigateToCoupon() {
    this.router.navigate(['/coupon']);
  }
  navigateToPaymentAmount() {
    this.router.navigate(['/paymentAmount']);
  }
  navigateToAllUsers() {
    this.router.navigate(['/allUsers']);
  }
  navigateToClose() {
    this.router.navigate(['/home'])
  }
  navigateToRaceMaster() {
    this.router.navigate(['/raceMaster'])
  }
  navigateToMoonMaster() {
    this.router.navigate(['/moonMaster'])
  }
  navigateToAstrologyMaster() {
    this.router.navigate(['/astrologyMaster'])
  }
  navigateToNatureMaster() {
    this.router.navigate(['/natureoftheday'])
  }
}
