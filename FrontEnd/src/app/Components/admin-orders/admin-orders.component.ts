import { Component, OnInit } from '@angular/core';
import { AggregationService } from '../../service/aggregation.service';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-admin-orders',
  standalone: false,
  
  templateUrl: './admin-orders.component.html',
  styleUrl: './admin-orders.component.scss'
})
export class AdminOrdersComponent implements OnInit {
    aggregation: any[] = []
  
    constructor(
      private transactions: AggregationService,
      private session: LocalService
    ){}

    ngOnInit(): void {
    const mail_id = this.session.getWithExpiry("login_session");
    this.aggregation = this.transactions.merge_admindata();
    // sorting the result according to datetime in descending order
    var result = this.aggregation.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    // Below is an Alternative method for the same
    //var result = this.aggregation.sort((a:any,b:any)=>b.createdAt < a.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0)
    this.transactions.setData(result)
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
