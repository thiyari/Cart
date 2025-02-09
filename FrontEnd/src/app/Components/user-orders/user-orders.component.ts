import { Component, OnInit } from '@angular/core';
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
    private transactions: AggregationService,
    private session: LocalService
  ){}

  ngOnInit(): void {
    const mail_id = this.session.getWithExpiry("login_session");
    this.aggregation = this.transactions.merge_userdata(mail_id)
    this.transactions.setData(this.aggregation)
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

  logout(){
    this.session.clearData();
    window.close();
  }
  
}
