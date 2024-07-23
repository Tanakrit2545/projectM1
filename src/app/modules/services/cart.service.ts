import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

const API_ENDPOINT = environment.API_ENDPOINT;

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  createdAt: Date;
  imageUrl: string; // Add this line
}

// 
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = []; // Initialize this with existing cart items
  private qrCodeImage: string = ''; // QR code image path

  constructor(private http: HttpClient) {}

  getAllCartItems(): Observable<CartItem[]> {
    return of(this.cartItems); // Replace with actual HTTP call if necessary
  }

  getAllcart(): Observable<any> {
    return this.http.get(API_ENDPOINT.concat('/api/cart/getAllcart'));
  }

  getByIdCart(cartId: any): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(API_ENDPOINT.concat(`/api/cart/getById?cartId=${cartId}`));
  }

  addCartItem(cartItem: CartItem): void {
    this.cartItems.push(cartItem);
  }

  deleteCartItem(id: number): Observable<void> {
    this.cartItems = this.cartItems.filter(item => item.id !== id);
    return of(); // Replace with actual HTTP call if necessary
  }

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
    return this.http.post<any>(API_ENDPOINT.concat('/api/cart/save'), body, httpOptions);
  }
}