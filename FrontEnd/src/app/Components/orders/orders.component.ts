import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-orders',
  standalone: false,
  
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{

fname: string ="";
lname: string ="";
email: string ="";
address: string ="";
public products: any = [];
public grandTotal !: number ;

constructor(private api: ApiService, private cartService: CartService){}
  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    })
  }

order_submit(){
  if (this.fname === "" || this.lname === "" || this.email === "" || this.address === ""){
    alert("Please fill the fields")
  }
  else{
    let bodyData = {
      "orderid": Math.floor(100000000 + Math.random() * 900000000),
      "firstname" : this.fname,
      "lastname" : this.lname,
      "email" : this.email,
      "shippingaddress": this.address,
      "ordersplaced":this.products,
      "grandtotal":this.grandTotal,
      "paymentstatus":"pending"
    };
    this.api.submit_order(bodyData)
    this.fname = "";
    this.lname = "";
    this.email  = "";
    this.address = "";    
  }
}
}
