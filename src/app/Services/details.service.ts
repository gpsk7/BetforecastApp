import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PaymentDetails {
  id: number;
  paymentId: string;
  orderId: string;
  currency: string;
  amount: number;
  signature: string;
  userId: string;
  status: string;
  creationTime: Date;
}

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  private apiUrl = '/api/races';

  constructor(private http: HttpClient) { }

  getUserPayments(userId: string): Observable<PaymentDetails[]> {
    return this.http.get<PaymentDetails[]>(`${this.apiUrl}/getUserPayments/${userId}`);
  }
}
