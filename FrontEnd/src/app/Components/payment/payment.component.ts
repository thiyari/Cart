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
    const referenceid = this.orders.referenceid;
    const RozarpayOptions = {
      key: environment.RAZOR_PAY_KEY,
      amount: this.orders.grandtotal*100,
      currency: 'INR',
      description: 'Sample Razorpay demo',
      image: 'https://4.imimg.com/data4/HS/BK/MY-146693/temporary-tattoos-en71-approved-500x500.jpg',
      name: "Services",
      prefill: {
        name: this.orders.name,
        email: this.orders.email,
        contact: this.orders.phone
      },
      handler: function(response:any){
        alert(response.razorpay_payment_id);
        window.location.href = `${environment.CLIENT_URI}/razorpaytxn/${referenceid}`
        return window.location.href
      },
      notes: {
        address: 'Razorpay address'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  function() {
          console.log('Transaction Cancelled')
        }
      },
    }

    

    const rzp = new this.winRef.nativeWindow.Razorpay(RozarpayOptions);
    
    rzp.on('payment.failed',function(response:any){
      alert(`Payment failed Reason: ${response.error.description}`);
    });

    rzp.open();
  }
}
