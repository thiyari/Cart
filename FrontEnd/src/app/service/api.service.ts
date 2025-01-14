import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(){
    return this.http.get<any>(`${environment.SERVER_URI}/api/products`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  addProduct(bodyData:any){
    return this.http.post<any>(`${environment.SERVER_URI}/api/products/create`,bodyData)
    .subscribe(()=>{
      alert("Product Registered Successfully");
    })
  }

  submit_order(bodyData: any){
    return this.http.post<any>(`${environment.SERVER_URI}/api/orders/create`,bodyData)
    .subscribe(()=>{
      const order_id = bodyData.orderid
      this.router.navigate(['/payment/'+ order_id])
    })
  }

  getOrders(){
    return this.http.get<any>(`${environment.SERVER_URI}/api/orders`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  phonepe(data: any){
    return this.http.post<any>(`${environment.SERVER_URI}/api/phonepe`,data)
    .subscribe((response)=>{
        if(response.data && response.data.instrumentResponse.redirectInfo.url){
          window.location.href = response.data.instrumentResponse.redirectInfo.url;
        }
        return window.location.href
    })
  }

  googlepay(data: any){
    return this.http.post<any>(`${environment.SERVER_URI}/api/googlepay`,data)
    .subscribe()
  }

  paypal_pay(data: any){
    return this.http.post<any>(`${environment.SERVER_URI}/api/paypal-pay`,data)
    .subscribe()
  }

  razorpay_pay(data: any){
    console.log(data)
    return this.http.post<any>(`${environment.SERVER_URI}/api/razorpay-pay`,data)
    .subscribe()
  }

  phonepe_txn(){
    return this.http.get<any>(`${environment.SERVER_URI}/api/phonepetxn`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  googlepay_txn(){
    return this.http.get<any>(`${environment.SERVER_URI}/api/googlepaytxn`)
    .pipe(map((res)=>{
      return res;
    }))
  }

  paypal_txn(){
    return this.http.get<any>(`${environment.SERVER_URI}/api/paypaltxn`)
    .pipe(map((res)=>{
      return res;
    }))
  }

}
