import { Component, OnInit } from '@angular/core';
import { AggregationService } from '../../service/aggregation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-order',
  standalone: false,
  
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss'
})
export class ViewOrderComponent implements OnInit{
  public data:any;
  constructor(
    private transactions: AggregationService,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    const order_id = this.route.snapshot.params["orderid"]; 
    var result =this.transactions.getData();
    this.data = result.find((x:any)=>{
      return(x.orderid == parseInt(order_id))
    })
    console.log(this.data)
  }
}
