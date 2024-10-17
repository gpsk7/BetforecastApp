import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../models/coupon.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiUrl = '/api/v1/coupon';

  constructor(private http: HttpClient) {}

  createCoupon(coupon: Coupon): Observable<string> {
    return this.http.post<string>(this.apiUrl, coupon,{ responseType: 'text' as 'json' });
  }

  getCoupons(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.apiUrl);
  }

  deleteCoupon(coupon: Coupon): Observable<string> {
    return this.http.request<string>('delete', this.apiUrl, { body: coupon ,responseType: 'text' as 'json' });
  }
  // getCoupon(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }
}