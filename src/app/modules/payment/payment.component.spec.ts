import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;
  let debugElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display payment message when credit card button is clicked', () => {
    const button = debugElement.query(By.css('.payment-method-button:nth-child(1)')).nativeElement;
    button.click();
    fixture.detectChanges();
    const paymentMessage = debugElement.query(By.css('.payment-message')).nativeElement;
    expect(paymentMessage.textContent).toContain('กรุณาใส่ข้อมูลบัตรเครดิต/เดบิต');
  });

  it('should display payment message when bank account button is clicked', () => {
    const button = debugElement.query(By.css('.payment-method-button:nth-child(2)')).nativeElement;
    button.click();
    fixture.detectChanges();
    const paymentMessage = debugElement.query(By.css('.payment-message')).nativeElement;
    expect(paymentMessage.textContent).toContain('กรุณาใส่ข้อมูลบัญชีธนาคาร');
  });

  it('should display QR code section when QR code button is clicked', () => {
    const button = debugElement.query(By.css('.payment-method-button:nth-child(3)')).nativeElement;
    button.click();
    fixture.detectChanges();
    const paymentMessage = debugElement.query(By.css('.payment-message')).nativeElement;
    const qrCodeSection = debugElement.query(By.css('.qr-code-section')).nativeElement;
    expect(paymentMessage.textContent).toContain('กรุณาสแกนรหัส QR เพื่อชำระเงิน');
    expect(qrCodeSection).toBeTruthy();
  });

  it('should display slip uploaded message when file is selected', () => {
    component.handleQRCodePayment();
    fixture.detectChanges();
    const input = debugElement.query(By.css('.qr-code-section input')).nativeElement;
    const event = { target: { files: [new File([], 'slip.jpg')] } } as any;
    input.dispatchEvent(new Event('change'));
    component.onFileSelected(event);
    fixture.detectChanges();
    const slipUploadedMessage = debugElement.query(By.css('.slip-uploaded-message')).nativeElement;
    expect(slipUploadedMessage.textContent).toContain('อัปโหลดสลิปเรียบร้อยแล้ว');
  });

  it('should display success message when confirm button is clicked with slip uploaded', () => {
    component.handleQRCodePayment();
    component.slipUploaded = true;
    fixture.detectChanges();
    const confirmButton = debugElement.query(By.css('.confirm-button')).nativeElement;
    confirmButton.click();
    fixture.detectChanges();
    const confirmationMessage = debugElement.query(By.css('.confirmation-message')).nativeElement;
    expect(confirmationMessage.textContent).toContain('การชำระเงินสำเร็จ ขอบคุณที่ใช้บริการ');
  });

  it('should display failure message when confirm button is clicked without slip uploaded', () => {
    component.handleQRCodePayment();
    component.slipUploaded = false;
    fixture.detectChanges();
    const confirmButton = debugElement.query(By.css('.confirm-button')).nativeElement;
    confirmButton.click();
    fixture.detectChanges();
    const confirmationMessage = debugElement.query(By.css('.confirmation-message')).nativeElement;
    expect(confirmationMessage.textContent).toContain('ชำระเงินไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
  });
});
