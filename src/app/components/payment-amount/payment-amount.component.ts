import { Component, OnInit } from '@angular/core';
import { Amount, AmountService } from 'src/app/Services/amount.service';

@Component({
  selector: 'app-payment-amount',
  templateUrl: './payment-amount.component.html',
  styleUrls: ['./payment-amount.component.css']
})
export class PaymentAmountComponent implements OnInit {

 amount: number | undefined;
  currentAmount: number | undefined;  // To store the current amount fetched from the API
  message: string = '';

  constructor(private amountService: AmountService) {}

  ngOnInit() {
    this.fetchCurrentAmount();
  }

  fetchCurrentAmount() {
    this.amountService.getAmount().subscribe({
      next: (response: any) => {
        this.currentAmount = response.value; 
      },
      error: (err: any) => {
        this.message = 'Error fetching the current amount';
        console.error(err);
      }
    });
  }

  onSubmit() {
    if (this.amount !== undefined) {
      this.amountService.createAmount(this.amount)
        .subscribe({
          next: (response: any) => {
            this.message = response.message || 'Amount saved successfully';  
            this.fetchCurrentAmount(); 
          },
          error: (err: any) => {
            this.message = 'Error saving amount';
            console.error(err);
          }
        });
    } else {
    
      this.message = 'Please enter a valid amount';
    }
  }
}