import { Component, OnInit } from '@angular/core';
import { AggregationService } from '../../service/aggregation.service';

@Component({
  selector: 'app-view-order',
  standalone: false,
  
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss'
})
export class ViewOrderComponent implements OnInit{
  constructor(private transactions: AggregationService){}
  ngOnInit(): void {
    var result = this.transactions.getData();
    console.log(result)
  }
}
