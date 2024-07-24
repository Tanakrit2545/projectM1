import { Component, OnInit } from '@angular/core';
import { CartService } from './../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentMessage: string;
  showQRCode: boolean = true;
  slipUploadedMessage: string;
  slipUploaded: boolean = false;
  showNotification: boolean = false;
  processingPayment: boolean = false;
  paymentSuccess: boolean = false;
  paymentFailure: boolean = false; // เพิ่มสถานะสำหรับการชำระเงินไม่สำเร็จ
  slipPreview: string | ArrayBuffer | null = null;
  qrCodeImage: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.cartService.getQrCodeImage().subscribe((imagePath: string) => {
      this.qrCodeImage = imagePath;
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.slipUploaded = true;
      this.slipUploadedMessage = 'อัปโหลดสลิปเรียบร้อยแล้ว';
      const reader = new FileReader();
      reader.onload = () => {
        this.slipPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  confirmPayment() {
    this.showNotification = true;
    this.processingPayment = true;

    setTimeout(() => {
      this.processingPayment = false;
      if (this.slipUploaded) {
        this.paymentSuccess = true;

        setTimeout(() => {
          this.finalizePayment();
        }, 2000); // Delay before redirecting
      } else {
        this.paymentFailure = true;

        setTimeout(() => {
          this.resetNotification();
        }, 2000); // Delay before hiding the notification
      }
    }, 2000); // Simulate processing time
  }

  finalizePayment() {
    this.showNotification = false;
    this.router.navigate(['/momo']);
  }

  resetNotification() {
    this.showNotification = false;
    this.paymentFailure = false;
  }
}
