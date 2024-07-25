import { Component, OnInit } from '@angular/core';
import { PaymentService } from './../services/payment.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-managePayment',
  templateUrl: './managePayment.component.html',
  styleUrls: ['./managePayment.component.css']
})
export class ManagePaymentComponent implements OnInit {
  paymentList: any[] = [];
  filteredPaymentList: any[] = [];
  searchQuery: string = '';
  selectedPaymentId: number | null = null;
  showConfirmModal: boolean = false;
  showNotification: boolean = false;
  processingPayment: boolean = false;
  paymentSuccess: boolean = false;
  paymentFailure: boolean = false;
  selectedSlip: string | null = null; // To store the selected slip image for preview
  editingPayment: any = null; // To store payment details being edited

  constructor(private paymentService: PaymentService) {}

  ngOnInit() {
    this.loadPayments();
  }

  loadPayments() {
    this.paymentService.getAllPayment().subscribe(res => {
      if (res.data) {
        this.paymentList = res.data;
        this.filteredPaymentList = this.paymentList;
        console.log("Payment List:", this.paymentList); // ตรวจสอบข้อมูลที่ได้รับ
      }
    });
  }

  onSearch() {
    this.filteredPaymentList = this.paymentList.filter(payment => 
      payment.userId.toString().includes(this.searchQuery) ||
      payment.statusPayment.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      payment.pricePayment.toString().includes(this.searchQuery)
    );
  }

  editPayment(payment: any) {
    this.editingPayment = { ...payment }; // Clone payment details for editing
  }

  saveEdit() {
    if (this.editingPayment) {
      this.paymentService.updatePaymentItem(this.editingPayment.id, this.editingPayment).subscribe({
        next: () => {
          this.paymentSuccess = true;
          setTimeout(() => {
            this.showNotification = false;
            this.loadPayments(); // Reload payments after edit
            this.editingPayment = null; // Close the edit form
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          this.paymentFailure = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
          console.error('Error updating payment:', error.message);
        }
      });
    }
  }

  confirmDelete(paymentId: number) {
    this.selectedPaymentId = paymentId;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.selectedPaymentId = null;
  }

  deletePayment() {
    if (this.selectedPaymentId !== null) {
      this.showNotification = true;
      this.processingPayment = true;

      this.paymentService.deletePaymentItem(this.selectedPaymentId).subscribe({
        next: () => {
          setTimeout(() => {
            this.processingPayment = false;
            this.paymentSuccess = true;
            setTimeout(() => {
              this.showNotification = false;
              this.filteredPaymentList = this.paymentList.filter(payment => payment.id !== this.selectedPaymentId);
              this.closeConfirmModal();
            }, 2000);
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          this.processingPayment = false;
          this.paymentFailure = true;
          setTimeout(() => {
            this.showNotification = false;
            this.closeConfirmModal();
          }, 2000);
          console.error('Error deleting payment:', error.message);
        }
      });
    }
  }

  viewSlipPreview(payment: any) {
    if (payment.slipImage) {
      this.selectedSlip = payment.slipImage;
    }
  }

  closeSlipPreview() {
    this.selectedSlip = null;
  }
}
