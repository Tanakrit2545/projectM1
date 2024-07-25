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

  // Define status colors
  statusColors: { [key: string]: string } = {
    'ชำระเงินสำเร็จ': 'success',
    'รอการตรวจสอบยืนยัน': 'warning',
    'สลิปปลอม': 'danger'
  };

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
      console.log('Editing Payment:', this.editingPayment); // Log data to verify
      this.paymentService.updatePaymentItem(this.editingPayment.id, this.editingPayment).subscribe({
        next: (response) => {
          console.log('Update Response:', response); // Log response to verify
          this.paymentSuccess = true;
          setTimeout(() => {
            this.showNotification = false;
            this.loadPayments(); // Reload payments after edit
            this.editingPayment = null; // Close the edit form
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error updating payment:', error.message); // Log error
          this.paymentFailure = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
        }
      });
    }
  }
  
  

  confirmDelete(paymentId: number) {
    console.log('Confirm delete called for ID:', paymentId);
    this.selectedPaymentId = paymentId;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
    this.selectedPaymentId = null;
  }

  deletePayment() {
    if (this.selectedPaymentId !== null) {
      this.paymentService.deletePaymentItem(this.selectedPaymentId).subscribe({
        next: () => {
          this.paymentSuccess = true;
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
            this.loadPayments(); // รีโหลดข้อมูลการชำระเงินหลังจากลบ
          }, 2000);
        },
        error: (error: HttpErrorResponse) => {
          this.paymentFailure = true;
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 2000);
          console.error('Error deleting payment:', error.message);
        }
      });
      this.closeConfirmModal();
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

  // Get status color for badge
  getStatusColor(status: string) {
    return this.statusColors[status as keyof typeof this.statusColors] || 'secondary';
  }
}
