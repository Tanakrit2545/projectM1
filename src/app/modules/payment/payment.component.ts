import { Component, OnInit } from '@angular/core';
import { CartService } from './../services/cart.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  paymentFailure: boolean = false;
  slipPreview: string | ArrayBuffer | null = null;
  qrCodeImage: string = '';
  countdownTime: number = 600; // 10 minutes in seconds
  countdownTimer: any;
  timeLeft: string = '';
  orderId: string | null = null;
  orderitemId : any
  userDate : any
  price : any

  constructor(private cartService: CartService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {

    const userDetailSession: any = sessionStorage.getItem("userDetail");
        if (userDetailSession) {
            this.userDate = JSON.parse(userDetailSession);
            console.log('userId:', this.userDate.userId);
        }

    this.orderitemId = this.route.snapshot.queryParamMap.get('orderId');
    console.log('Order ID:', this.orderitemId);

    this.cartService.getByIdCart(this.orderitemId).subscribe((res) => {
      if (res.data) {

       this.price = res.data.price

        console.log(res.data);
      }
    });

    this.cartService.getQrCodeImage().subscribe((imagePath: string) => {
      this.qrCodeImage = imagePath;
    });
    this.startCountdown();
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
      clearInterval(this.countdownTimer); // หยุดนับถอยหลังเมื่ออัปโหลดเสร็จ
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
            cartId : this.orderitemId,
            userId : this.userDate.userId,
            pricePayment : this.price
          }

          this.cartService.savePayment(data).subscribe((res)=>{
            if(res.data){
              console.log(res.data)
            }
          })
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
