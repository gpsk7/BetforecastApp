import { Component } from '@angular/core';
import { DetailsService, PaymentDetails } from 'src/app/Services/details.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  userId: string | null;
  paymentDetails: PaymentDetails[] = [];

  constructor(private detailsService: DetailsService) {
    this.userId = ''; // Initialize userId
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userID');
    if (this.userId) {
      this.getPaymentDetails();
    } else {
      console.error('User ID not found in localStorage.');
    }
  }

  getPaymentDetails(): void {
    this.detailsService.getUserPayments(this.userId!)
      .subscribe(data => {
        this.paymentDetails = data;
      });
  }

}