import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';


interface TransactionDetails {
  orderId: string;
  currency: string;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseUrl = '/api/races/transaction';
  private apiUrl = '/api/races';

  constructor(private http: HttpClient) { }
  createTransaction(amount: any): Observable<any> {
    const userId = localStorage.getItem("userID");
    const transactionRequest ={
      amount: amount,
      userId: userId,
    };
    const url = `${this.baseUrl}`;
    return this.http.post<any>(url, transactionRequest);
  }

  savePayment(paymentData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/savePayment`, paymentData);
  }
  getAllPayments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/getAllPayments`);
  }
}