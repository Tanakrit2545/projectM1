import { Component, OnInit } from '@angular/core';
import { CartService } from './../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  paymentMessage: string = '';
  showQRCode: boolean = true;
  slipUploadedMessage: string = '';
  slipUploaded: boolean = false;
  showNotification: boolean = false;
  processingPayment: boolean = false;
  paymentSuccess: boolean = false;
  paymentFailure: boolean = false;
  slipPreview: string | ArrayBuffer | null = null;
  qrCodeImage: string = '';
  countdownTime: number = 600; // 10 minutes in seconds
  countdownTimer: any;
  timeLeft: string = '';
  orderId: string | null = null;
  userDate: any;
  price: any;

  constructor(
    private cartService: CartService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userDate = this.getUserDetails();
    this.orderId = this.route.snapshot.queryParamMap.get('orderId');
    
    if (this.orderId) {
      this.loadOrderDetails(this.orderId);
    }
    
    this.loadQrCodeImage();
    this.startCountdown();
  }

  getUserDetails() {
    const userDetailSession: string | null = sessionStorage.getItem("userDetail");
    if (userDetailSession) {
      return JSON.parse(userDetailSession);
    }
    return null;
  }

  loadOrderDetails(orderId: string) {
    this.cartService.getByIdCart(orderId).subscribe((res) => {
      if (res.data) {
        this.price = res.data.price;
        console.log('Order Details:', res.data);
      }
    });
  }

  loadQrCodeImage() {
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
      clearInterval(this.countdownTimer); // Stop countdown when file is uploaded
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
          const data = {
            cartId: this.orderId,
            userId: this.userDate?.userId,
            pricePayment: this.price
          };

          this.cartService.savePayment(data).subscribe((res) => {
            if (res.data) {
              console.log('Payment Response:', res.data);
            }
          });
        }, 2000);
      } else {
        this.paymentFailure = true;
        setTimeout(() => {
          this.resetNotification();
        }, 2000);
      }
    }, 2000);
  }

  finalizePayment() {
    this.showNotification = false;
    this.router.navigate(['/momo']);
  }

  resetNotification() {
    this.showNotification = false;
    this.paymentFailure = false;
  }

  startCountdown() {
    this.updateTimeLeft();
    this.countdownTimer = setInterval(() => {
      if (this.countdownTime > 0) {
        this.countdownTime--;
        this.updateTimeLeft();
      } else {
        clearInterval(this.countdownTimer);
        this.paymentMessage = 'หมดเวลาในการแนบสลิป';
      }
    }, 1000);
  }

  updateTimeLeft() {
    const minutes = Math.floor(this.countdownTime / 60);
    const seconds = this.countdownTime % 60;
    this.timeLeft = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }
}
