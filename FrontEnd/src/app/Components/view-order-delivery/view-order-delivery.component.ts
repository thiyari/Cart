import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-view-order-delivery',
  standalone: false,
  
  templateUrl: './view-order-delivery.component.html',
  styleUrl: './view-order-delivery.component.scss'
})
export class ViewOrderDeliveryComponent implements OnInit{
    order:any;
    options = ["Order Confirmed", "Out For Delivery", "Delivered"];
    optionSelected: any;
    trackingid: any;
    constructor(
          private api: ApiService,
          private route: ActivatedRoute,
          private http: HttpClient, 
          private router: Router
    ){}
  ngOnInit(): void {
    this.http.get<any>(`${environment.SERVER_URI}/api/session`)
    .subscribe((res)=>{
          if(res.valid){
              if (res.log_status === "admin") {
                const order_id = this.route.snapshot.params['orderid'];
                this.api.getOrders()
                .subscribe(res=>{
                  if (res.message === "Success"){
                      this.order = res.records.find((item:any)=>JSON.stringify(item.orderid)===order_id)
                      this.optionSelected = this.order.delivery.status
                    }
                  })  
              }
          } else {
            this.router.navigate(['/login'])
          }
    })  
  }

  onOptionsSelected(event: any){
    this.optionSelected = event; //option value will be sent as event
    }

  logout(){
    this.http.get<any>(`${environment.SERVER_URI}/api/logout`)
        .subscribe((res)=>{
          if(res.valid){
            window.close();
          } else {
            alert("Logout Failed");
          }
        })
  }
}
