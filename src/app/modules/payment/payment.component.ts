import { Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentMessage: string;
  showQRCode: boolean = false;
  slipUploadedMessage: string;
  slipUploaded: boolean = false;
  confirmationMessage: string;
  finalConfirmationMessage: string;
  slipPreview: string | ArrayBuffer | null = null;
  private confirmationTimeout: any;
  confirmTransaction: boolean = false;

  handleCreditCardPayment() {
    this.resetMessages();
    this.paymentMessage = 'กรุณาใส่ข้อมูลบัตรเครดิต/เดบิต';
    this.showQRCode = false;
  }

  handleBankAccountPayment() {
    this.resetMessages();
    this.paymentMessage = 'กรุณาใส่ข้อมูลบัญชีธนาคาร';
    this.showQRCode = false;
  }

  handleQRCodePayment() {
    this.resetMessages();
    this.paymentMessage = 'กรุณาสแกนรหัส QR เพื่อชำระเงิน';
    this.showQRCode = true;
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
    if (this.slipUploaded) {
      this.confirmTransaction = true;
      this.finalConfirmationMessage = 'การชำระเงินสำเร็จ ขอบคุณที่ใช้บริการ';
      setTimeout(() => {
        this.finalizePayment();
      }, 2000);
    } else {
      this.confirmationMessage = 'ชำระเงินไม่สำเร็จ กรุณาลองใหม่อีกครั้ง';
      this.setConfirmationTimeout();
    }
  }

  finalizePayment() {
    window.location.href = './motorcycle';
  }

  cancelPayment() {
    this.resetMessages();
    this.slipPreview = null;
  }

  private resetMessages() {
    this.paymentMessage = '';
    this.showQRCode = false;
    this.slipUploadedMessage = '';
    this.confirmationMessage = '';
    this.confirmTransaction = false; // Reset confirmTransaction to false on reset
  }

  private setConfirmationTimeout() {
    this.confirmationTimeout = setTimeout(() => {
      this.confirmationMessage = '';
    }, 500);
  }
}
