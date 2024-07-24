import { HomeComponent } from 'src/app/modules/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';

import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { MotorcycleComponent } from './modules/motorcycle/motorcycle.component';
import { ManageUserComponent } from './modules/manageUser/manageUser.component';
import { ManageProductComponent } from './modules/manageProduct/manageProduct.component';
import { ProductComponent } from './modules/product/product.component';
import { UpdateProductComponent } from './modules/updateProduct/updateProduct.component';
import { ReportComponent } from './modules/report/report.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { ManageMotorcycleComponent } from './modules/manageMotorcycle/manageMotorcycle.component';
import { MomoComponent } from './modules/momo/momo.component';
import { OrderComponent } from './modules/order/order.component';
import { ManagePaymentComponent } from './modules/managePayment/managePayment.component';


const routes: Routes = [
  {
    path: '',
    component: FullwidthComponent,
    children: [{
      path: '',
      component: HomeComponent
    },{
      path: 'register',
      component: RegisterComponent
    },{
      path: 'login',
      component: LoginComponent
    },{
      path: 'home',
      component: HomeComponent
    },{
      path: 'profile',
      component: ProfileComponent
    },{
      path: 'motorcycle',
      component: MotorcycleComponent 
    },{
      path: 'manage-user',
      component: ManageUserComponent
    },{
      path: 'manage-payment',
      component: ManagePaymentComponent
    },{
      path: 'profile/:userId',
      component: ProfileComponent
    },{
      path: 'manage-product',
      component: ManageProductComponent
    },{
      path: 'product',
      component: ProductComponent
    },{
      path: 'product/:productId',
      component: UpdateProductComponent
    },{
      path: 'momo',
      component: MomoComponent
    },{
      path: 'order/:id',
      component: OrderComponent
    },{
      path: 'payment',
      component: PaymentComponent
    },{ path: '', redirectTo: '/manage-motorcycle',
       pathMatch: 'full' 

    },{
      path: 'manage-motorcycle',
      component: ManageMotorcycleComponent
    },{
      path: 'report',
      component: ReportComponent
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
