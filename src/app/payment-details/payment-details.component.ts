import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../Services/payment.service';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.css']
})
export class PaymentDetailsComponent implements OnInit {

  paymentDetails: any[] = [];

  constructor(private paymentService: PaymentService) { }

  ngOnInit(): void {
    this.getPaymentDetails();
  }

  getPaymentDetails(): void {
    this.paymentService.getAllPayments().subscribe(
      (data: any[]) => {
        this.paymentDetails = data;
        if (data.length === 0) {
          alert('No data available');
        }
      },
      (error: any) => {
        console.error('Error fetching payment details:', error);
      }
    );
  }
}
