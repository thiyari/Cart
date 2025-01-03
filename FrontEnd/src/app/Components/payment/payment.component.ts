import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: false,
  
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit{

  public order_id: any;
  public orders: any;

  constructor(private api: ApiService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.order_id = this.route.snapshot.params['orderid'];
    this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.orders = res.records.find((item:any)=>
          item.orderid === this.order_id 
        );
        console.log(this.orders)
      }
    })
  }
}
