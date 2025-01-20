import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user-requests',
  standalone: false,
  
  templateUrl: './user-requests.component.html',
  styleUrl: './user-requests.component.scss'
})
export class UserRequestsComponent implements OnInit{
  orders_records: any;
  constructor(private api: ApiService){}
  ngOnInit(): void {
    const mail_id = "neeharika@gmail.com"; 
    this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.orders_records = res.records.filter((item:any)=>item.email===mail_id && item.transactionstatus === "pending")
        }
      })
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
