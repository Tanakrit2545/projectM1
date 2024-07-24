import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../services/payment.service';

@Component({
  selector: 'app-managePayment',
  templateUrl: './managePayment.component.html',
  styleUrls: ['./managePayment.component.css']
})
export class ManagePaymentComponent implements OnInit {
  paymentList: any = [];

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.paymentService.getAllPayment().subscribe(res => {
      if (res.data) {
        this.paymentList = res.data;
        console.log("payment", this.paymentList);
      }
    });
  }

  editPayment(payment: any) {
    // Implement edit payment functionality
    console.log('Edit payment:', payment);
  }

  deletePayment(paymentId: number) {
    // Implement delete payment functionality
    console.log('Delete payment ID:', paymentId);
  }
}
