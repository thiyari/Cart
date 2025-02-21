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
    tracking_id: any;
    expected_date: any;
    delivery_date: any;
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
                      this.expected_date = this.order.delivery.expected_date
                      this.delivery_date = this.order.delivery.delivery_date
                      this.tracking_id = this.order.delivery.tracking_id
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

  update(optionSelected:any){

    if (optionSelected === 'Order Confirmed'){
      let body = {
        "status": optionSelected,
        "expected_date": "pending",
        "tracking_id": "pending",
        "delivery_date": "pending",
      }
      console.log(body)
    } 
    if (optionSelected === 'Out For Delivery'){
      if (optionSelected === 'Out For Delivery' && this.tracking_id === 'pending'){
        alert("please enter the tracking id")

      } else if (optionSelected === 'Out For Delivery' && this.expected_date === 'pending') {
        alert("please pick the expected date")
      } else {
        let body = {
          "status": optionSelected,
          "expected_date": this.expected_date,
          "tracking_id": this.tracking_id,
          "delivery_date": "pending"
        }
        console.log(body)
      }
    }  

    if (optionSelected === 'Delivered' && this.delivery_date === 'pending') {
      alert("please pick the delivery date")
    } else {
      let body = {
        "status": optionSelected,
        "expected_date": this.expected_date,
        "tracking_id": this.tracking_id,
        "delivery_date": this.delivery_date,
      }
      console.log(body)
    }
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
