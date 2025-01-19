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

  reference_ids:any[] = [];
  orders_records: any;
  paypal_records:any[] = [];
  constructor(private api: ApiService){}

  ngOnInit(): void {
    const mail_id = "manikanth578@gmail.com"; 
    this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.orders_records = res.records.filter((item:any)=>item.email===mail_id)
        this.orders_records.map((x:any)=>this.reference_ids.push(x.referenceid))
        }
      })

    this.api.paypal_txn()
      .subscribe(res=>{
        if (res.message === "Success"){
          for (let i = 0; i < this.reference_ids.length; i++){
            res.records.map((item:any)=>{
              if(item.referenceid === this.reference_ids[i]){
                this.paypal_records.push(item)
              }
            })
          }
          }
        });



        let mergedArray = this.paypal_records.map((paypal:any) => {
          let ordersArray = this.orders_records.find((orders:any) => orders.referenceid === paypal.referenceid);
          return Object.assign({}, paypal, ordersArray);
      });
        console.log(mergedArray)

  }
}
