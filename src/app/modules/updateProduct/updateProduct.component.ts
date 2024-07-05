import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateProduct',
  templateUrl: './updateProduct.component.html',
  styleUrls: ['./updateProduct.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activated: ActivatedRoute,
    private sanitizer: DomSanitizer,
  ) { }

  productTypeList: any;
  productId: any;
  productImgList: any[];
  imageBlobUrl: any;
  imageList: any[] = [];
  selectedFiles: File[] = [];
  delFile: string[] = [];

  updateProductForm = this.formBuilder.group({
    productName: '',
    productDesc: '',
    price: parseFloat('0').toFixed(2),
    quantity: 0,
    productTypeId: '',
    files: [],
    productId: ''
  });

  ngOnInit() {
    this.getProductTypeAll();
    this.productId = this.activated.snapshot.paramMap.get("productId");
    this.productService.getProductByProductId(this.productId).subscribe((res) => {
      if (res.data) {
        this.setDataForm(res.data);

        // Get product images
        this.productService.getProductImgByProductId(res.data.productId).subscribe((imgRes) => {
          if (imgRes.data) {
            this.productImgList = imgRes.data;
            for (let productImg of this.productImgList) {
              this.getImage(productImg.productImgName);
            }
          } else {
            window.location.reload(); // Reload page if no image data
          }
        });
      }
    });
  }

  setDataForm(data: any) {
    this.updateProductForm.patchValue({
      productName: data.productName,
      productDesc: data.productDesc,
      price: data.price,
      quantity: data.quantity,
      productTypeId: data.productTypeId,
      productId: data.productId
    });
  }

  onSubmit() {
    const data = this.updateProductForm.value;
    this.productService.updateProduct(data, this.productId).subscribe(res => {
      if (res.data) {

        // Delete images
        if (this.delFile.length > 0) {
          for (let fileName of this.delFile) {
            this.productService.deleteImage(fileName).subscribe(res => {
              console.log("deleteImage =>", res);
            });
          }
        }

        // Save new images
        if (this.selectedFiles.length > 0) {
          for (const file of this.selectedFiles) {
            const formData = new FormData();
            formData.append('file', file); 
            this.productService.saveImage(formData, res.data).subscribe(res => {
              console.log("saveImage =>", res.data);
            });
          }
        }

        // Show success message and navigate
        if (res.data) {
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Product updated successfully',
            confirmButtonText: 'OK',
          }).then(res => {
            if (res.isConfirmed) {
              this.router.navigate(['/manage-product']);
            }
          });

        } else {
          Swal.fire({
            icon: 'warning',
            title: 'Failed!',
            text: 'Failed to update product. Please check your data.',
            confirmButtonText: 'OK',
          });
        }

      }
    });
  }

  getProductTypeAll() {
    this.productService.getProductTypeAll().subscribe((res) => {
      if (res.data) {
        this.productTypeList = res.data;
      }
    });
  }

  getImage(fileName: string) {
    this.productService.getImageByte(fileName).subscribe((res) => {
      let objectURL = URL.createObjectURL(res);
      this.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      this.imageList.push({
        key: fileName,
        value: this.imageBlobUrl
      });
    });
  }

  onFileChanged(event: any) {
    this.selectedFiles = event.target.files;
    console.log("this.selectedFiles", this.selectedFiles);
  }

  onDeleteFileChanged(fileName: any) {
    this.imageList = this.imageList.filter(image => image.key !== fileName);
    this.delFile.push(fileName);
    console.log("this.delFile", this.delFile);
  }

}
