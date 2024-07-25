import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private paymentItems: any[] = []; // Initialize this with existing payment items

  constructor(private http: HttpClient) {}

  getAllPayment(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/api/payment/getAllpayment'));
  }

  getByIdPayment(paymentId: number): Observable<any> {
    return this.http.get<any>(`${API_ENDPOINT}/api/payment/getById/${paymentId}`);
  }

  addPaymentItem(paymentItem: any): void {
    this.paymentItems.push(paymentItem);
  }

  savePayment(data: any): Observable<any> {
    const body = JSON.stringify(data);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post<any>(API_ENDPOINT.concat('/api/payment/save'), body, httpOptions);
  }

  deletePaymentItem(id: number): Observable<void> {
    return this.http.delete<void>(`${API_ENDPOINT}/api/payment/delete?paymentId=${id}`);
  }

  updatePaymentItem(paymentId: number, paymentItem: any): Observable<any> {
    const body = JSON.stringify(paymentItem);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<any>(`${API_ENDPOINT}/api/payment/update/${paymentId}`, body, httpOptions);
  }
}
