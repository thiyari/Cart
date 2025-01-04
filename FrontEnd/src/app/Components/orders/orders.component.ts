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
phone: string="";
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
  if (this.fname === "" || this.lname === "" || this.email === "" || this.phone === "" || this.phone.length != 10 || this.address === ""){
    alert("Please fill the fields")
  }
  else{
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();
    const datetime = currDate+currTime
    const random_digits = datetime.replace(/[^0-9]/g, "")
    const orderid = Math.floor(10 + Math.random() * 90)+random_digits;
    let bodyData = {
      "orderid": orderid,
      "firstname" : this.fname,
      "lastname" : this.lname,
      "email" : this.email,
      "phone": parseInt(this.phone),
      "shippingaddress": this.address,
      "ordersplaced":this.products,
      "grandtotal":this.grandTotal,
      "paymentstatus":"pending"
    };
    this.api.submit_order(bodyData)
    this.fname = "";
    this.lname = "";
    this.email  = "";
    this.phone = "";
    this.address = "";    
  }
}
}
