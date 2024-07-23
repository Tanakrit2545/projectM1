import { Component, OnInit } from '@angular/core';
import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  createdAt: Date;
  imageUrl: string; // Add this line
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartItems: CartItem[] = [];
  qrCodeImage: string = ''; // Add this line

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getAllCartItems().subscribe((data: CartItem[]) => {
      this.cartItems = data;
    });

    this.cartService.getQrCodeImage().subscribe((imagePath: string) => {
      this.qrCodeImage = imagePath; // Add this line
    });
  }

  checkout() {
    console.log('Checkout process started');
    this.router.navigate(['/payment']);
  }

  removeCartItem(id: number) {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }
}
