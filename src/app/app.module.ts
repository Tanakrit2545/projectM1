import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MotorcycleComponent } from './modules/motorcycle/motorcycle.component';
import { QRCodeModule } from 'angularx-qrcode';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { MomoComponent } from './modules/momo/momo.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxLoadingModule } from "ngx-loading";
import { DefaultModule } from './layouts/default/default.module';
import { FullwidthModule } from './layouts/fullwidth/fullwidth.module'; // Import FullwidthModule
import { NgxPermissionsModule } from 'ngx-permissions';
import { DataSharingService } from './modules/DataSharingService';
import { PaymentComponent } from './modules/payment/payment.component';
import { ManageMotorcycleComponent } from './modules/manageMotorcycle/manageMotorcycle.component';


// import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@NgModule({
  declarations: [
    AppComponent,
    MotorcycleComponent,
    PaymentComponent,
    ManageMotorcycleComponent,
    MomoComponent,
    // ProductComponent // Remove ProductComponent from here
    // Other components
  ],
  imports: [
    BrowserModule,
    NgbModule,
    DefaultModule,
    QRCodeModule,
    NgxQRCodeModule,
    FullwidthModule, // Ensure FullwidthModule is imported here
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgxPermissionsModule.forRoot(),
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [DataSharingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
