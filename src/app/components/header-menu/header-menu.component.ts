import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.css']
})
export class HeaderMenuComponent implements OnInit {
  isAdmin :boolean = false;
 constructor(
   private router: Router,
   private authService: AuthService,
 ) { }

 ngOnInit(): void {
   this.isAdmin= this.authService.isAdminLoggedIn();
  }
  navigateToRaceDetail(data: any) {
    this.router.navigate(["race"])
  }
  navigateToPaymentDetail(data: any) {
    this.router.navigate(["form"])
  }

  navigateToProfile(data: any) {
    this.router.navigate(["profile"]);
  }
  navigateToLogout(data: any) {
  // window.alert("Your are logged successfully");
    this.router.navigate(["logout"]);

  }
  navigateToFeedback(data: any) {
    this.router.navigate(["feedback"]);
  }

  navigateToRecentPayments() {
    this.router.navigate(["recentPaymentDetails"])
  }
  navigateToNewPayments() {
    this.router.navigate(["payment"])
  }
  navigateToHome(data: any){
    this.router.navigate(["home"])
  }
  navigateToAdmin(data: any){
    this.router.navigate(["admin"])
  }
  navigateToHorseMaster(data: any){
    this.router.navigate(["horseMaster"])
  }
  navigateToNumerology(data: any){
    this.router.navigate(["numerology"])
  }
  navigateToAstrology(data: any){
    this.router.navigate(["astrology"])
  }
  navigateToYt(data: any){
    this.router.navigate(["yt"])
  }
  navigateToInplayMaster(data: any){
    this.router.navigate(["inplayMaster"])
  }
}

