import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { ICreateOrderRequest, IPayPalConfig, ITransactionItem } from 'ngx-paypal';

@Component({
  selector: 'app-paypal',
  standalone: false,
  
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.scss'
})
export class PaypalComponent implements OnInit{

  public orders: any;
  public payPalConfig?: IPayPalConfig;
  grandTotal:any;
  
  constructor(private api: ApiService, private route: ActivatedRoute){}

  ngOnInit(): void {
    const order_id = this.route.snapshot.params['orderid'];
    this.orders = this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.orders = res.records.find((item:any)=>
          JSON.stringify(item.orderid) === order_id
        );
      }
    })
    this.initConfig();
  }

    roundup(value:any){
        return Math.ceil(value * 100) / 100
    }
    grandtotal(){
        let values:number[] = [];
        this.orders.ordersplaced.forEach((x:any)=>{
            values.push(x.quantity * this.roundup(x.price*0.012));
        });
        let grandTotal: number = values.reduce((a, b) => {  
            return this.roundup(a + b);  
        }, 0); 
        return grandTotal
    }    


  private initConfig(): void {
    const currency = "USD";
    this.payPalConfig = {
        currency: currency,
        clientId: 'AYaJue-5Dr7hIopc-lw7y-3utpPUOJ5O_u9PW2B0Oi0QTbRiB6ov3Acu-xdJLP9FB6kiMyUut3kDh3Zo',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: currency,
                    value: this.grandtotal().toString(),
                    breakdown: {
                        item_total: {
                            currency_code: currency,
                            value: this.grandtotal().toString()
                        }
                    }
                },
                items: this.orders.ordersplaced.map((x:any) => <ITransactionItem>{
                    name: x.name,
                    quantity: x.quantity,
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                        currency_code: currency,
                        value: (this.roundup(x.price*0.012)).toString(),
                    },
                })
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            return actions.order.capture().then((details:any) => {
                console.log(details);
            });

        },
        onError: err => {
            console.log('OnError', err);
        }
    };
}


}
