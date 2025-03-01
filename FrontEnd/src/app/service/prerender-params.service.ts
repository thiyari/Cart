import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { AggregationService } from './aggregation.service';

@Injectable({
  providedIn: 'root'
})
export class PrerenderParamsService {

  product_ids:any[] = [];
  admin_ids:any[] = [];
  order_ids:any[] = [];
  phonepe_txn_ids:any[] = [];
  googlepay_txn_ids:any[] = [];
  razorpay_txn_ids:any[] = [];
  paypal_txn_ids:any[] = [];
  payment_referenceids:any[] = [];

  constructor(private api:ApiService, private transactions: AggregationService) { }

  edit_admin(){
    this.api.getAdmins().subscribe(res=>{
      if (res.message === "Success"){
            res.records.map((x:any)=>(this.admin_ids.push({pid: JSON.stringify(x.pid)})))
      }
    })
    return Promise.resolve(this.admin_ids)
  }

  product() {
    this.api.getProducts().subscribe(res=>{
      if (res.message === "Success"){
            res.records.map((x:any)=>(this.product_ids.push({id: JSON.stringify(x.pid)})))
        }
    })
    return Promise.resolve(this.product_ids)
 }

 product_view() {
  this.api.getProducts().subscribe(res=>{
    if (res.message === "Success"){
          res.records.map((x:any)=>(this.product_ids.push({pid: JSON.stringify(x.pid)})))
      }
  })
  return Promise.resolve(this.product_ids)
} 

  orders() {
    this.api.getOrders().subscribe(res=>{
      if (res.message === "Success"){
          res.records.map((x:any)=>(this.order_ids.push({orderid: JSON.stringify(x.orderid)})))
      }
    })
    return Promise.resolve(this.order_ids)
  }

  phonepe_txn(){
    this.api.phonepe_txn().subscribe(res=>{
      if (res.message === "Success"){
        res.records.map((x:any)=>(this.phonepe_txn_ids.push({referenceid: JSON.stringify(x.referenceid)})))
      }
    })
    return Promise.resolve(this.phonepe_txn_ids)
  }

  googlepay_txn(){
    this.api.googlepay_txn().subscribe(res=>{
      if (res.message === "Success"){
        res.records.map((x:any)=>(this.googlepay_txn_ids.push({referenceid: JSON.stringify(x.referenceid)})))
      }
    })
    return Promise.resolve(this.googlepay_txn_ids)
  }

  razorpay_txn(){
    this.api.razorpay_txn().subscribe(res=>{
      if (res.message === "Success"){
          res.records.map((x:any)=>(this.razorpay_txn_ids.push({referenceid: JSON.stringify(x.referenceid)})))
      }
    })
    return Promise.resolve(this.razorpay_txn_ids)
  }

  paypal_txn(){
    this.api.paypal_txn().subscribe(res=>{
      if (res.message === "Success"){
          res.records.map((x:any)=>(this.paypal_txn_ids.push({referenceid: JSON.stringify(x.referenceid)})))
      }
    })
    return Promise.resolve(this.paypal_txn_ids)
  }

  payment_txn(){
    this.transactions.merge_admindata().map((x:any)=>(this.payment_referenceids.push({referenceid: JSON.stringify(x.referenceid)})))
    return Promise.resolve(this.payment_referenceids)
  }
}
