import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from './../services/product.service';
import { CartService } from './../services/cart.service'; // Add this import

interface Product {
  productId: number;
  productName: string;
  price: number;
  quantity?: number;
  imgList: SafeResourceUrl[];
  productType?: any[] | undefined; // Adjust this type based on the actual structure returned from getProductTypeAll()
  productTypeId?: number; // Add productTypeId if it exists in your data
}

@Component({
  selector: 'app-momo',
  templateUrl: './momo.component.html',
  styleUrls: ['./momo.component.css']
})
export class MomoComponent implements OnInit, OnDestroy {
  imageBlobUrls: SafeResourceUrl[] = [];
  productImgList: any;
  productList: Product[] = [];
  productTypeList: any = [];
  subscriptions: Subscription[] = [];
  cart: Product[] = [];
  qrCodeImage: string = ''; // Default QR code image path
  notification: string = '';
  order : any

  constructor(
    private productService: ProductService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private cartService: CartService // Inject CartService
  ) {}

  ngOnInit() {
    this.getProductTypeAll();

    const productSub = this.productService.getAllProduct().subscribe(res => {
      if (res.data) {
        this.productList = res.data;
        for (let product of this.productList) {
          product.imgList = [];
          // Ensure productTypeId is defined in your data structure before accessing it
          if (product.productTypeId) {
            product.productType = this.productTypeList.filter((x: any) => x.productTypeId == product.productTypeId); // Adjust according to actual structure
          }
          const imgSub = this.productService.getProductImgByProductId(product.productId).subscribe((res) => {
            if (res.data) {
              this.productImgList = res.data;
              for (let productImg of this.productImgList) {
                this.getImage(productImg.productImgName, product.imgList);
              }
            } else {
              window.location.reload();
            }
          });
          this.subscriptions.push(imgSub);
        }
      }
    });
    this.subscriptions.push(productSub);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getImage(fileNames: any, imgList: SafeResourceUrl[]) {
    const imgSub = this.productService.getBlobThumbnail(fileNames).subscribe((res) => {
      let objectURL = URL.createObjectURL(res);
      let imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
      imgList.push(imageBlobUrl);
    });
    this.subscriptions.push(imgSub);
  }

  getProductTypeAll() {
    const typeSub = this.productService.getProductTypeAll().subscribe((res) => {
      if (res.data) {
        this.productTypeList = res.data;
      }
    });
    this.subscriptions.push(typeSub);
  }

  onDeleteProduct(productId: any) {
    if (productId) {
      const deleteSub = this.productService.deleteProduct(productId).subscribe(res => {
        if (res.data) {
          window.location.reload();
        }
      });
      this.subscriptions.push(deleteSub);
    }
  }

  onUpdateProduct(productId: any) {
    this.router.navigate(['/product/' + productId]);
  }

  // addToCart(product: Product): void {
  //   const existingProduct = this.cart.find(item => item.productId === product.productId);
  //   if (existingProduct) {
  //     if (existingProduct.quantity === undefined) {
  //       existingProduct.quantity = 1; // Initialize quantity if undefined
  //     } else {
  //       existingProduct.quantity++;
  //     }
  //   } else {
  //     product.quantity = 1;
  //     this.cart.push(product);
  //   }

  //   // Add to CartService
  //   this.cartService.addCartItem({
  //     id: this.cart.length, // Assuming id is the length of cart array, you can change this logic as needed
  //     productId: product.productId,
  //     productName: product.productName,
  //     price: product.price,
  //     quantity: product.quantity!,
  //     createdAt: new Date(),
  //     imageUrl: product.imgList[0] as string // Add this line, assuming the first image in the list is the primary image
  //   });

  //   // Calculate the total price of the item(s) in the cart
  //   const totalPrice = this.calculateCartTotal();

  //   // Update QR code image based on total cart price
  //   if (totalPrice === 1200) {
  //     this.qrCodeImage = './assets/images/1200.png';
  //   } else if (totalPrice === 2400) {
  //     this.qrCodeImage = './assets/images/2400.png';
  //   } else {
  //     this.qrCodeImage = ''; // No QR code for other totals
  //   }

  //   // Update QR code image in CartService
  //   this.cartService.setQrCodeImage(this.qrCodeImage); // Add this line
  // }

  addToCart(product: Product): void {
    const existingProduct = this.cart.find(item => item.productId === product.productId);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;
    } else {
      product.quantity = 1;
      this.cart.push(product);
    }
  
    // Add to CartService
    this.cartService.addCartItem({
      id: this.cart.length, // Use an appropriate ID or unique identifier
      productId: product.productId,
      productName: product.productName,
      price: product.price,
      quantity: product.quantity!,
      createdAt: new Date(),
      imageUrl: product.imgList[0] as string
    });
  
    // Calculate the total price of the items in the cart
    const totalPrice = this.calculateCartTotal();
  
    // Update QR code image based on total cart price
    if (totalPrice === 1000) {
      this.qrCodeImage = './assets/images/1000.png';
    } else if (totalPrice === 1200) {
      this.qrCodeImage = './assets/images/1200.png';
    }else if (totalPrice === 2000) {
      this.qrCodeImage = './assets/images/2000.png';
    }else if (totalPrice === 2200) {
      this.qrCodeImage = './assets/images/2200.png';
    }else if (totalPrice === 2400) {
      this.qrCodeImage = './assets/images/2400.png';
    }else if (totalPrice === 3000) {
      this.qrCodeImage = './assets/images/3000.png';
    }else if (totalPrice === 3200) {
      this.qrCodeImage = './assets/images/3200.png';
    }else if (totalPrice === 3400) {
      this.qrCodeImage = './assets/images/3400.png';
    }else if (totalPrice === 3600) {
      this.qrCodeImage = './assets/images/3600.png';
    } else {
      this.qrCodeImage = ''; // No QR code for other totals
    }
  
    this.cartService.setQrCodeImage(this.qrCodeImage); // Update QR code image in CartService
  }

  incrementQuantity(product: Product): void {
    const cartItem = this.cart.find(item => item.productId === product.productId);
    if (cartItem) {
      if (cartItem.quantity === undefined) {
        cartItem.quantity = 1; // Initialize quantity if undefined
      } else {
        cartItem.quantity++;
      }
    }
  }

  decrementQuantity(product: Product): void {
    const cartItem = this.cart.find(item => item.productId === product.productId);
    if (cartItem && cartItem.quantity && cartItem.quantity > 1) {
      cartItem.quantity--; // Ensure quantity is defined and greater than 1
    }
  }

  removeFromCart(productId: number): void {
    this.cart = this.cart.filter(item => item.productId !== productId);
  }

  updateCartProduct(productId: number): void {
    this.router.navigate(['/product/' + productId]);
  }

  checkout(): void {
    this.cart.forEach(item => {
      const data = {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price
      };
      console.log('Checkout process started', data);
      this.cartService.saveCart(data).subscribe(response => {
        if(response.data){
          this.order = response.data.id
          console.log(response.data)
        }
        this.router.navigate(['/order/'+ this.order]);
      }, error => {
        console.error('Checkout error:', error);
      });
    });
  }

  calculateCartTotal(): number {
    let totalPrice = 0;
    this.cart.forEach(item => {
      totalPrice += item.price * (item.quantity || 1); // Multiply price by quantity
    });
    return totalPrice;
  }

  refreshCart(): void {
    // Add your refresh cart logic here
    console.log('Cart refreshed');
  }

  getProductType(product: Product): string {
    if (product.productType && product.productType.length > 0) {
      return product.productType[0]?.productTypeName || '-';
    } else {
      return '-';
    }
  }
}
