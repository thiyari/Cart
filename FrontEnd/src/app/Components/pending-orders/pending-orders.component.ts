import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-pending-orders',
  standalone: false,
  
  templateUrl: './pending-orders.component.html',
  styleUrl: './pending-orders.component.scss'
})
export class PendingOrdersComponent implements OnInit{
  orders_records: any;
  constructor(
    private api: ApiService,
    private session: LocalService
  ){}

  ngOnInit(): void {
    const mail_id = this.session.getWithExpiry("login_session");
      this.api.getOrders()
      .subscribe(res=>{
        if (res.message === "Success"){
            var result = res.records.filter((item:any)=>item.transactionstatus === "pending")
            this.orders_records = result.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          }
        })
  }

  onDelete(orderid:any){
    const status = this.api.remove_userRequest(orderid)
    if(status){
      this.orders_records = this.orders_records.filter((item:any) => item.orderid != orderid);
    }
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
