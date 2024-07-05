import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router

interface Motorcycle {
  id: number;
  motorcycleName: string;
  motorcycleDesc: string;
  price: number;
  status: string;
  image: string;
  quantity?: number;
}

@Component({
  selector: 'app-motorcycle',
  templateUrl: './motorcycle.component.html',
  styleUrls: ['./motorcycle.component.css']
})
export class MotorcycleComponent implements OnInit {
  motorcycles: Motorcycle[] = [];
  filteredMotorcycles: Motorcycle[] = [];
  cart: Motorcycle[] = [];
  searchQuery: string = '';
  motorcycleDesc: string = '';
  status: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  totalPages: number = 1;
  notification: string = '';
  qrCodeImage: string = './assets/images/qr.jpg'; // Default QR code image path

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Option 1: Fetch motorcycles from API
    this.fetchMotorcyclesFromAPI();

    // Option 2: Use hardcoded data (uncomment if needed)
    this.motorcycles = [
      { id: 1, motorcycleName: 'Yamaha R1', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/r1.jpg' },
      { id: 2, motorcycleName: 'Honda CBR1000RR', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/cbr1000.jpg' },
      { id: 3, motorcycleName: 'Kawasaki Ninja ZX-10R', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/zx10.jpg' },
      { id: 4, motorcycleName: 'BMW S1000RR', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/s1000.png' },
      { id: 5, motorcycleName: 'Ducati Panigale V4', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/v4.jpg' },
      { id: 6, motorcycleName: 'Suzuki GSX-R1000', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/gsx1000.png' },
      { id: 7, motorcycleName: 'Aprilia RSV4', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/ap4.jpg' },
      { id: 8, motorcycleName: 'BMW Gs1250RS', motorcycleDesc: 'Turing', price: 1200, status: 'ว่าง', image: './assets/images/gs.png' },
      { id: 9, motorcycleName: 'Ducati Panigale 899', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/panigale899.jpg' },
      { id: 10, motorcycleName: 'Hayabusa', motorcycleDesc: 'Scooter', price: 1200, status: 'ว่าง', image: './assets/images/hayabusa.jpg' },
      { id: 11, motorcycleName: 'Kawasaki H2R', motorcycleDesc: 'Sport', price: 1200, status: 'ว่าง', image: './assets/images/h2r.jpg' }
      // Add more entries as needed
    ];

    // Initialize filtered motorcycles with all motorcycles
    this.filteredMotorcycles = [...this.motorcycles];
    this.calculatePagination();
  }

  fetchMotorcyclesFromAPI(): void {
    this.http.get<Motorcycle[]>('https://api.example.com/motorcycles').subscribe(
      data => {
        this.motorcycles = data;
        this.filteredMotorcycles = data;
        this.calculatePagination();
      },
      error => {
        console.error('Error fetching motorcycles:', error);
        this.notification = 'Failed to fetch motorcycles. Please try again later.';
      }
    );
  }

  handleSearchChange(): void {
    this.filterMotorcycles();
  }

  handleMotorcycleDescChange(): void {
    this.filterMotorcycles();
  }

  handleStatusChange(): void {
    this.filterMotorcycles();
  }

  filterMotorcycles(): void {
    this.filteredMotorcycles = this.motorcycles.filter(motorcycle => {
      return (
        (!this.searchQuery || motorcycle.motorcycleName.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (!this.motorcycleDesc || motorcycle.motorcycleDesc === this.motorcycleDesc) &&
        (!this.status || motorcycle.status === this.status)
      );
    });
    this.calculatePagination();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.filteredMotorcycles.length / this.itemsPerPage);
    this.updateCurrentMotorcycles();
  }

  updateCurrentMotorcycles(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    let endIndex = startIndex + this.itemsPerPage;

    // Check if endIndex exceeds the length of filteredMotorcycles
    if (endIndex > this.filteredMotorcycles.length) {
      endIndex = this.filteredMotorcycles.length;
    }

    this.filteredMotorcycles = this.filteredMotorcycles.slice(startIndex, endIndex);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateCurrentMotorcycles();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateCurrentMotorcycles();
    }
  }

  addToCart(motorcycle: Motorcycle): void {
    const existingMotorcycle = this.cart.find(item => item.id === motorcycle.id);
    if (existingMotorcycle) {
      existingMotorcycle.quantity!++;
    } else {
      motorcycle.quantity = 1;
      this.cart.push(motorcycle);
    }
    
    // Calculate the total price of the item(s) in the cart
    const totalPrice = this.calculateCartTotal();
    
    // Update QR code image based on total cart price
    if (totalPrice === 1200) {
      this.qrCodeImage = './assets/images/1200.png';
    } else if (totalPrice === 2400) {
      this.qrCodeImage = './assets/images/2400.png';
    } else {
      // Default to randomize if not 1200 or 2400
      this.randomizeQRCodeImage();
    }
  }
  
  

  calculateCartTotal(): number {
    let totalPrice = 0;
    this.cart.forEach(item => {
      totalPrice += item.price * (item.quantity || 1); // Multiply price by quantity
    });
    return totalPrice;
  }

  incrementQuantity(motorcycle: Motorcycle): void {
    motorcycle.quantity!++;
  }

  decrementQuantity(motorcycle: Motorcycle): void {
    if (motorcycle.quantity! > 1) {
      motorcycle.quantity!--;
    }
  }

  removeFromCart(motorcycle: Motorcycle): void {
    this.cart = this.cart.filter(item => item.id !== motorcycle.id);
  }

  refreshCart(): void {
    this.notification = 'Cart refreshed!';
    setTimeout(() => this.notification = '', 2000);
  }

  checkout(): void {
    this.router.navigate(['/payment']);
  }

  randomizeQRCodeImage(): void {
    const images = ['./assets/images/r1q.jpg', './assets/images/q1r.jpg'];
    this.qrCodeImage = images[Math.floor(Math.random() * images.length)];
  }
}
