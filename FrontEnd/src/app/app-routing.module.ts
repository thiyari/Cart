import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './Components/products/products.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProdregComponent } from './Components/prodreg/prodreg.component';
import { ViewProductComponent } from './Components/view-product/view-product.component';
import { OrdersComponent } from './Components/orders/orders.component';
import { PaymentComponent } from './Components/payment/payment.component';

const routes: Routes = [
  {path:'', redirectTo:'products', pathMatch:'full'},
  {path:'products', component: ProductsComponent},
  {path:'cart',component: CartComponent},
  {path:'prodreg',component: ProdregComponent},
  {path:'orders',component: OrdersComponent},
  {path:'payment',component: PaymentComponent},
  {path:'product/:id',component: ViewProductComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
