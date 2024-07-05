// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { FormsModule } from '@angular/forms';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement } from '@angular/core';
// import { MotorcycleComponent } from './motorcycle.component';

// describe('MotorcycleComponent', () => {
//   let component: MotorcycleComponent;
//   let fixture: ComponentFixture<MotorcycleComponent>;

//   // Randomly generated motorcycles for testing
//   const motorcycles = [
//     { id: 1, name: 'Yamaha R1', crustType: 'Sport', size: '1000cc', price: 1200, status: 'ว่าง', image: 'v4.jpg' },
//     { id: 2, name: 'Honda CBR1000RR', crustType: 'Sport', size: '1000cc', price: 1200, status: 'ว่าง', image: 'cbr1000.jpg' },
//     { id: 3, name: 'Kawasaki Ninja ZX-10R', crustType: 'Sport', size: '1000cc', price: 1200, status: 'ว่าง', image: 'zx10r.jpg' },
//     { id: 4, name: 'BMW S1000RR', crustType: 'Sport', size: '1000cc', price: 1200, status: 'ว่าง', image: 's1000rr.jpg' },
//     { id: 5, name: 'Ducati Panigale V4', crustType: 'Sport', size: '1000cc', price: 1200, status: 'ว่าง', image: 'panigalev4.jpg' }
//   ];

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       declarations: [MotorcycleComponent],
//       imports: [FormsModule, RouterTestingModule, HttpClientTestingModule]
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(MotorcycleComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('should fetch motorcycles on init', () => {
//   //   spyOn(component, 'fetchMotorcycles').and.callThrough(); // Ensure fetchMotorcycles method is actually called
//   //   component.ngOnInit();
//   //   expect(component.fetchMotorcycles).toHaveBeenCalled();
//   // });

//   it('should filter motorcycles based on search query', () => {
//     component.motorcycles = motorcycles;
//     component.searchQuery = 'Yamaha';
//     component.handleSearchChange();
//     expect(component.filteredMotorcycles.length).toBe(1);
//     expect(component.filteredMotorcycles[0].name).toBe('Yamaha R1');
//   });

//   it('should add motorcycle to cart', () => {
//     const motorcycle = motorcycles[0]; // Using the first motorcycle in the array
//     component.addToCart(motorcycle);
//     expect(component.cart.length).toBe(1);
//     expect(component.cart[0].name).toBe('Yamaha R1');
//   });

//   it('should increment quantity in cart', () => {
//     const motorcycle = { ...motorcycles[0], quantity: 1 }; // Using the first motorcycle in the array with quantity
//     component.cart = [motorcycle];
//     component.incrementQuantity(motorcycle);
//     expect(component.cart[0].quantity).toBe(2);
//   });

//   it('should decrement quantity in cart', () => {
//     const motorcycle = { ...motorcycles[0], quantity: 2 }; // Using the first motorcycle in the array with quantity 2
//     component.cart = [motorcycle];
//     component.decrementQuantity(motorcycle);
//     expect(component.cart[0].quantity).toBe(1);
//   });

//   it('should remove motorcycle from cart', () => {
//     const motorcycle = { ...motorcycles[0], quantity: 1 }; // Using the first motorcycle in the array with quantity
//     component.cart = [motorcycle];
//     component.removeFromCart(motorcycle);
//     expect(component.cart.length).toBe(0);
//   });
// });
