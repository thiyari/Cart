import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProdregComponent } from './Components/prodreg/prodreg.component';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { PhonepeSuccessComponent } from './Components/phonepe-success/phonepe-success.component';
import { PaypalComponent } from './Components/paypal/paypal.component';
import { PayGoogleComponent } from './Components/pay-google/pay-google.component';
import { GooglepaySuccessComponent } from './Components/googlepay-success/googlepay-success.component';
import { PaypalSuccessComponent } from './Components/paypal-success/paypal-success.component';
import { RazorpaySuccessComponent } from './Components/razorpay-success/razorpay-success.component';
import { UserOrdersComponent } from './Components/user-orders/user-orders.component';
import { UserProfileComponent } from './Components/user-profile/user-profile.component';

const routes: Routes = [
  {path:'', redirectTo:'products', pathMatch:'full'},
  {path:'products', component: ProductsComponent},
  {path:'cart',component: CartComponent},
  {path:'prodreg',component: ProdregComponent},
  {path:'orders',component: OrdersComponent},
  {path:'googlepay',component: PayGoogleComponent},
  {path:'userprofile',component: UserProfileComponent},
  {path:'userorders',component: UserOrdersComponent},
  {path:'phonepetxn/:referenceid',component:PhonepeSuccessComponent},
  {path:'googlepaytxn/:referenceid',component:GooglepaySuccessComponent},
  {path:'paypaltxn/:referenceid',component: PaypalSuccessComponent},
  {path:'razorpaytxn/:referenceid',component: RazorpaySuccessComponent},
  {path:'product/:id',component: ViewProductComponent},
  {path:'payment/:orderid',component: PaymentComponent},
  {path:'paypal/:orderid',component: PaypalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
