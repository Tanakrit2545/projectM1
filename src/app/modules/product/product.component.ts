import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CallserviceService } from '../services/callservice.service';
import { MotorcycleService } from '../services/motorcycle.service'; // Import MotorcycleService

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productForm: FormGroup;
  productTypeList = [
    { productTypeId: 1, productTypeName: 'Sport' },
    { productTypeId: 2, productTypeName: 'Turing' },
    { productTypeId: 3, productTypeName: 'Scooter' },
    { productTypeId: 4, productTypeName: 'Naked' }
  ];
  isSubmit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private callService: CallserviceService,
    private motorcycleService: MotorcycleService // Inject MotorcycleService
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      productTypeId: ['', Validators.required],
      productName: ['', Validators.required],
      productDesc: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]{1,2})?$/)]],
      quantity: ['', Validators.required],
      files: ['', Validators.required]
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.productForm.valid) {
      const newMotorcycle = {
        id: Math.floor(Math.random() * 1000), // Generate a random id
        motorcycleName: this.productForm.value.productName,
        motorcycleDesc: this.productForm.value.productDesc,
        price: this.productForm.value.price,
        status: 'ว่าง',
        image: './assets/images/default.jpg', // Default image
        quantity: this.productForm.value.quantity
      };
      this.callService.saveMotorcycle(newMotorcycle).subscribe({
        next: (response) => {
          console.log('Motorcycle saved successfully!', response);
          this.productForm.reset();
          this.isSubmit = false;
          this.motorcycleService.loadMotorcycles(); // Call loadMotorcycles() from MotorcycleService
        },
        error: (error) => {
          console.error('Error saving motorcycle:', error);
        }
      });
    } else {
      this.setSubmit();
    }
  }

  onFileChanged(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.productForm.patchValue({ files: files });
    }
  }

  setSubmit() {
    this.productForm.markAllAsTouched();
  }

  fixDecimals() {
    let value = this.productForm.get('price')!.value;
    if (value && value.indexOf('.') !== -1) {
      const decimalPart = value.split('.')[1];
      if (decimalPart.length > 2) {
        this.productForm.patchValue({ price: parseFloat(value).toFixed(2) });
      }
    }
  }
}
