import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from './../services/product.service';

interface ProductType {
  id: number;
  productTypeName: string;
  productTypeDesc?: string;
}

interface Product {
  productId: number;
  productName: string;
  price: number;
  quantity?: number;
  imgList: SafeResourceUrl[];
  productType?: ProductType;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  productTypeList: ProductType[] = [];
  displayedProducts: Product[] = []; // Products to display

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getProductTypeAll();
    this.loadProducts();
    this.startProductRotation();
  }

  loadProducts(): void {
    this.productService.getAllProduct().subscribe(
      (res) => {
        if (res.data) {
          this.products = res.data.map((product: any) => ({
            productId: product.productId,
            productName: product.productName,
            price: product.price,
            imgList: [],
            productType: null
          }));

          this.products.forEach((product) => {
            this.productService.getProductImgByProductId(product.productId).subscribe((imgRes) => {
              if (imgRes.data) {
                imgRes.data.forEach((img: any) => {
                  this.getImage(img.productImgName, product.imgList);
                });
              }
            });

            this.productService.getProductTypeByProductId(product.productId).subscribe((typeRes) => {
              if (typeRes.data) {
                product.productType = typeRes.data as ProductType;
              }
            });
          });

          // Update displayed products initially
          this.updateDisplayedProducts();
        }
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  getImage(fileName: string, imgList: SafeResourceUrl[]): void {
    this.productService.getBlobThumbnail(fileName).subscribe((res) => {
      const objectURL = URL.createObjectURL(res);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      imgList.push(safeUrl);
    });
  }

  viewDetails(productId: number): void {
    this.router.navigate(['/momo']);
  }

  getProductTypeAll(): void {
    this.productService.getProductTypeAll().subscribe(res => {
      if (res.data) {
        this.productTypeList = res.data as ProductType[];
      }
    });
  }

  getProductTypeName(product: Product): string {
    return product.productType?.productTypeName || '-';
  }

  startProductRotation(): void {
    setInterval(() => {
      this.updateDisplayedProducts();
    }, 10000); // Update every 10 seconds
  }

  updateDisplayedProducts(): void {
    const shuffledProducts = this.shuffleArray([...this.products]);
    this.displayedProducts = shuffledProducts.slice(0, 3); // Show 3 random products
  }

  shuffleArray(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
