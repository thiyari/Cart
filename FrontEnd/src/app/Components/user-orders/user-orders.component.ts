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
      /*
      var ids = ['512d5793abb900bf3e20d012', '512d5793abb900bf3e20d011'];
      var obj_ids = ids.map(function(id) { return ObjectId(id); });
      db.test.find({_id: {$in: obj_ids}});
      */
  }
  

}
