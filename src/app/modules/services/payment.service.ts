import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;


@Injectable({
    providedIn: 'root'
  })
  export class PaymentService {
    private paymentItems: PaymentItem[] = []; // Initialize this with existing cart items
    private qrCodeImage: string = ''; // QR code image path
  
    constructor(private http: HttpClient) {}
  
    getAllPaymentItems(): Observable<PaymentItem[]> {
      return of(this.paymentItems); // Replace with actual HTTP call if necessary
    }
  
    getAllPayment(): Observable<any> {
      return this.http.get(API_ENDPOINT.concat('/api/payment/getAllpayment'));
    }
  
    getByIdPayment(cartId: any): Observable<PaymentItem[]> {
      return this.http.get<PaymentItem[]>(API_ENDPOINT.concat(`/api/cart/getById?cartId=${cartId}`));
    }
  
    addPaymentItem(paymentItem: PaymentItem): void {
      this.paymentItems.push(paymentItem);
    }
  
    // deletePaymentItem(id: number): Observable<void> {
    //   this.paymentItems = this.paymentItems.filter(item => item.id !== id);
    //   return of();
    // }
  
    setQrCodeImage(imagePath: string): void {
      this.qrCodeImage = imagePath;
    }
  
    getQrCodeImage(): Observable<string> {
      return of(this.qrCodeImage);
    }
  
    saveCart(data: any): Observable<any> {
      const body = JSON.stringify(data);
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      return this.http.post<any>(API_ENDPOINT.concat('/api/payment/save'), body, httpOptions);
    }
  }