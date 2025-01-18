import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-user-orders',
  standalone: false,
  
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnInit {

  reference_ids: Set<number> = new Set();
  orders_records: any;
  paypal_records:any[] = [];
  constructor(private api: ApiService){}

  ngOnInit(): void {
    const mail_id = "manikanth578@gmail.com"; 
    this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.orders_records = res.records.filter((item:any)=>item.email===mail_id)
        this.orders_records.map((x:any)=>this.reference_ids.add(x.referenceid))
        }
      })


      this.api.paypal_txn()
        .subscribe(res=>{
          if (res.message === "Success"){
              this.paypal_records = res.records.filter((x:any)=>x.referenceid === this.reference_ids.forEach((e:any)=>e))
            }
          });
          console.log(this.paypal_records)

  }
  

}
