import { Component, OnInit, Pipe } from '@angular/core';
import { Router } from '@angular/router';
import { Coupon } from 'src/app/models/coupon.model';
import { CouponService } from 'src/app/Services/coupon.service';
import { PaymentService } from 'src/app/Services/payment.service';
import { SnackbarService } from 'src/app/Services/snackbar.service';
import { Amount, AmountService } from 'src/app/Services/amount.service';



declare var Razorpay: any;

@Component({
  selector: 'app-razorpay-form',
  templateUrl: './razorpay-form.component.html',
  styleUrls: ['./razorpay-form.component.css']
})
export class RazorpayFormComponent implements OnInit {
onSelectedCoupon(coupon: Coupon) {
  console.log(coupon);
}

  transactionDetails: any;
  amount: any;
  response: any;
  transaction: any;
  isAgreed = false;
  isProcessingPayment = false;
  amountValue: number | undefined;
  discountedValue: number | undefined;
  
  coupons: Coupon[] = [];
  validCoupons: Coupon[] = [];
  selectedCoupon: Coupon = {
    coupon: '',
    percentage: 0 ,
    ExpirationDate: new Date()
  };



  constructor(private paymentService: PaymentService, 
    private amountService: AmountService,
    private router: Router,
     private snackbarService: SnackbarService,
     private couponService: CouponService
    ) { }
  ngOnInit(): void {
    this.fetchAmount();
    this.loadCoupons();  
  }

  fetchAmount(): void {
    this.amountService.getAmount().subscribe(
      (data: Amount) => {
        this.amountValue = data.value;
        this.discountedValue = data.value; // Initialize with the original amount
      },
      (error) => {
        console.error('Error fetching amount:', error);
      }
    );
  }

  apply(): void {
    console.log('Selected Coupon Object:', this.selectedCoupon);
    if (this.selectedCoupon && this.amountValue != null) {
      const percentage = this.selectedCoupon.percentage;
      console.log('Selected Coupon Percentage:', percentage);
      
      // Calculate the discounted value
      this.discountedValue = +(this.amountValue * (1 - percentage / 100)).toFixed(2); // +: The unary + operator is used to convert the string returned by .toFixed(2) back into a number. For example, +"15.35" converts the string "15.35" to the number 15.35.
      console.log('Discounted Value:', this.discountedValue);
    } else {
      console.log('No coupon selected or amount value is undefined');
    }
  }

  loadCoupons(): void {
    this.couponService.getCoupons().subscribe(coupons => {
      const now = new Date();
      this.validCoupons = coupons.filter(coupon => new Date(coupon.ExpirationDate) > now);
      this.coupons = [...this.validCoupons]; 
    });
  }

  createTransactionAndPay() {
    this.isProcessingPayment = true;

    if(!this.isAgreed){
      alert("Please Check The Checkbox To Proceed The Payment");
      return;
    }
    const amount = this.discountedValue; //assigining the amount
    console.log(amount)

    this.paymentService.createTransaction(amount).subscribe(
      (data) => {
        this.response = data;
        this.onPay(this.response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onPay(transaction: any): void {
    const amountInPaise = Number(this.response.amount) * 100;

    if (isNaN(amountInPaise)) {
      console.error('Invalid amount:', this.response.amount);
      alert('Invalid amount. Please try again.');
      return;
    }

    const options = {
      key: "rzp_test_I94FrvS0yaSqBQ",
      amount: amountInPaise,
      currency: transaction.currency,
      name: "Blue Light Innovation LLP",
      description: "Test Transaction",
      image: "assets/images/blp.png",
      order_id: transaction.orderId,
      handler: this.handlePaymentResponse.bind(this),
      prefill: {
        name: "Your Name",
        email: "Your Email",
        // contact: "Your Phone Number"
      },
      notes: {
        address: "Your Address"
      },
      theme: {
        color: "#3399cc"
      }

    };

    const rzp1 = new Razorpay(options);
    this.isProcessingPayment = false;
    rzp1.open();

    rzp1.on('payment.failed', (response: any) => {
      alert('Payment Failed: ' + response.error.description);
      this.snackbarService.show('Payment Failed: ' + response.error.description);
      console.log("on failure ", response);
      this.paymentOnfailureSave(response);
      this.router.navigate(['/payment']);
    });
  }

  handlePaymentResponse(response: any): void {
    // alert('Payment ID: ' + response.razorpay_payment_id);
    // alert('Order ID: ' + response.razorpay_order_id);
    // alert('Signature: ' + response.razorpay_signature);
    this.savePaymentDetails(response);
  }


  savePaymentDetails(paymentResponse: any): void {
    if (!this.response) {
      console.error('Response is undefined or null');
      return;
    }

    const paymentData = {
      paymentId: paymentResponse.razorpay_payment_id,
      orderId: paymentResponse.razorpay_order_id,
      signature: paymentResponse.razorpay_signature,
      amount: this.response.amount,
      currency: this.response.currency,
      userId: localStorage.getItem("userID"),
      status: "payment_success",
      description: "payment succesfull",
      transactionDetails: this.transactionDetails
    };
    console.log('Saving payment data:', paymentData);
    this.savePaymentDetailsIntoDB(paymentData);
    this.snackbarService.show('Payment Details Saved Successfully');
    this.router.navigate(['/race']);

  }

  savePaymentDetailsIntoDB(paymentData: any) {
    this.paymentService.savePayment(paymentData).subscribe(
      (data: any) => {
        console.log('Payment details saved successfully:', data);


      },
      (error: any) => {
        console.error('Error saving payment details:', error);
      }
    );
  }
  paymentOnfailureSave(response: any) {
    const paymentData = {
      paymentId: response.error.metadata.payment_id,
      orderId: response.error.metadata.order_id,
      userId: localStorage.getItem("userID"),
      status: response.error.reason,
      description: response.error.description,
      amount: this.response.amount,
      currency: this.response.currency,
      transactionDetails: this.transactionDetails
    };

    this.paymentService.savePayment(paymentData).subscribe(
      (data: any) => {
        console.log('Payment failure details saved successfully:', data);
        this.snackbarService.show('Payment failed: ' + response.error.description);
      },
      (error: any) => {
        this.snackbarService.show('Error saving payment failure details. Please try again.');
      }
    );
    console.log(paymentData);
  }
}
