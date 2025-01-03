import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProdregComponent } from './Components/prodreg/prodreg.component';
import { HeaderComponent } from './Components/header/header.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { FormsModule } from  '@angular/forms';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { OrdersComponent } from './Components/orders/orders.component';
import { PaymentComponent } from './Components/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdregComponent,
    HeaderComponent,
    CartComponent,
    ProductsComponent,
    ViewProductComponent,
    OrdersComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    SlickCarouselModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
