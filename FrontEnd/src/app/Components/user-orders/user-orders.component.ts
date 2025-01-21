import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { LocalService } from '../../service/local.service';
import { AggregationService } from '../../service/aggregation.service';

@Component({
  selector: 'app-user-orders',
  standalone: false,
  
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnInit {

  aggregation: any[] = []

  constructor(
    private transactions: AggregationService
  ){}

  ngOnInit(): void {
    const mail_id = "manikanth578@gmail.com"; 
    this.aggregation = this.transactions.merge(mail_id)
  }

  formatedDate = (savedTime:any) => {
    const date = new Date(savedTime).toLocaleString(
      "gu-IN",
      {
        timeStyle: "medium",
        dateStyle: "short",
      }
    );
    return date
  }
}
