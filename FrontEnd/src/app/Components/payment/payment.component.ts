import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from '../../service/local.service';
import { WindowRefService } from '../../window-ref.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-payment',
  standalone: false,
  
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  providers: [WindowRefService]
})
export class PaymentComponent implements OnInit{

  public orders: any;
  Razorpay: any;

  constructor(
    private api: ApiService, 
    private route: ActivatedRoute,
    private localStore: LocalService,
    private winRef: WindowRefService
  ){}

  ngOnInit(): void {
    const order_id = this.route.snapshot.params['orderid'];
    this.orders = this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.orders = res.records.find((item:any)=>
          JSON.stringify(item.orderid) === order_id
        );
      }
      this.localStore.saveData('orderid', this.orders.orderid);
      this.localStore.saveData('referenceid', this.orders.referenceid);
      this.localStore.saveData('amount', this.orders.grandtotal);
    })
  }
  phonepe_payment(){
    let data = {
      name: this.orders.name,
      amount: this.orders.grandtotal,
      phone: this.orders.phone,
      merchantUserID: "MUID" + Date.now(),
      merchantTransactionID: this.orders.referenceid
    }
    this.api.phonepe(data)
  }
  razorpay_payment(){
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: this.orders.grandtotal*100,
      name: this.orders.name,
      key: environment.RAZOR_PAY_KEY,
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'sai kumar',
        email: 'sai@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    const rzp = new this.winRef.nativeWindow.Razorpay(RozarpayOptions, successCallback, failureCallback);
    rzp.open();
  }
}
