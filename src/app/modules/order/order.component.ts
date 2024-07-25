import { Component, OnInit } from '@angular/core';
import { CartService } from './../services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';

interface CartItem {
  id: number;
  productId: number;
  productName: string;
  price: number;
  quantity: number;
  createdAt: Date;
  imageUrl: string;
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cartItems: CartItem[] = [];
  qrCodeImage: string = '';
  orderId: string | null = null; // สำหรับเก็บ orderId
  orderitemid: any;

  constructor(
    private cartService: CartService, 
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.orderitemid = this.route.snapshot.paramMap.get('id');
    console.log(this.orderitemid);

    this.cartService.getAllCartItems().subscribe((data: CartItem[]) => {
      this.cartItems = data;
    });

    this.cartService.getQrCodeImage().subscribe((imagePath: string) => {
      this.qrCodeImage = imagePath;
    });
  }

  checkout() {
    console.log('Checkout process started');
    this.router.navigate(['/payment'], { queryParams: { orderId: this.orderitemid } });
  }

  removeCartItem(id: number) {
    this.cartService.deleteCartItem(id).subscribe(() => {
      this.cartItems = this.cartItems.filter(item => item.id !== id);
    });
  }

  calculateTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  updateCartItem(id: number, quantity: number) {
    const updatedItem = this.cartItems.find(item => item.id === id);
    if (updatedItem) {
      updatedItem.quantity = quantity;
      this.cartService.updateCartItem(updatedItem).subscribe(() => {
        // รีเฟรชการคำนวณรวมและ QR Code
        this.updateCartSummary();
      });
    }
  }
  
  updateCartSummary() {
    const totalPrice = this.calculateTotal();
    if (totalPrice === 1200) {
      this.qrCodeImage = './assets/images/1200.png';
    } else if (totalPrice === 2400) {
      this.qrCodeImage = './assets/images/2400.png';
    } else {
      this.qrCodeImage = ''; // No QR code for other totals
    }
    this.cartService.setQrCodeImage(this.qrCodeImage); // Update QR code image in CartService
  }
}
