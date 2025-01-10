import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-payment',
  standalone: false,
  
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{

  public orders: any;

  constructor(
    private api: ApiService, 
    private route: ActivatedRoute,
    private localStore: LocalService
  ){}

  ngOnInit(): void {
    const order_id = this.route.snapshot.params['orderid'];
    this.orders = this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.orders = res.records.find((item:any)=>
          JSON.stringify(item.orderid) === order_id
        );
      }
      this.localStore.saveData('amount', this.orders.grandtotal);
    })
  }
  payment_method(){
    let data = {
      name: this.orders.name,
      amount: this.orders.grandtotal,
      phone: this.orders.phone,
      MerchantUserID: "MUID" + Date.now(),
      MerchantTransactionID: this.orders.referenceid
    }
    this.api.phonepe(data)
  }
}
