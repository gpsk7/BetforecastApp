import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/Services/coupon.service';

@Component({
  selector: 'app-coupon',
  templateUrl: './coupon.component.html',
  styleUrls: ['./coupon.component.css']
})
export class CouponComponent implements OnInit{

  coupons: Coupon[] = [];
  newCoupon: Coupon = {
    coupon: '',
    percentage: 0,
    ExpirationDate: new Date()
  };

  constructor(private couponService: CouponService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  loadCoupons(): void {
    this.couponService.getCoupons().subscribe((data) => {
      this.coupons = data;
    });
  }

  createCoupon(): void {
    const today = new Date();
    // Set the time to midnight for accurate comparison
    today.setHours(0, 0, 0, 0);
    
    if (!this.newCoupon.coupon || this.newCoupon.percentage <= 0 || !this.newCoupon.ExpirationDate) {
      this.snackBar.open('Please fill out all fields correctly!', 'Close', {  
        horizontalPosition: 'center', 
        verticalPosition: 'top',             
      });
      return;
    }

    if (this.newCoupon.percentage < 0 || this.newCoupon.percentage > 100) {
      this.snackBar.open('Percentage must be between 0 and 100!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    // Normalize the expiration date to midnight
    const expirationDate = new Date(this.newCoupon.ExpirationDate);
    expirationDate.setHours(0, 0, 0, 0);

    if (expirationDate < today) {
      this.snackBar.open('Expiration date must be today or a future date!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      return;
    }

    this.couponService.createCoupon(this.newCoupon).subscribe((message) => {
      this.loadCoupons();
      this.snackBar.open('Coupon created successfully!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      this.resetForm();
    }, (error) => {
      this.snackBar.open('Failed to create coupon! Coupon already exists!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  deleteCoupon(coupon: Coupon): void {
    this.couponService.deleteCoupon(coupon).subscribe((message) => {
      console.log(message);
      this.loadCoupons();
      this.snackBar.open('Coupon deleted successfully!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }, (error) => {
      this.snackBar.open('Failed to delete coupon!', 'Close', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    });
  }

  resetForm(): void {
    this.newCoupon = {
      coupon: '',
      percentage: 0,
      ExpirationDate: new Date()
    };
  }
}