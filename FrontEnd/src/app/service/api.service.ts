import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get<any>("http://localhost:8086/api/products")
    .pipe(map((res)=>{
      return res;
    }))
  }

  addProduct(bodyData:any){
    return this.http.post<any>("http://localhost:8086/api/products/create",bodyData)
    .subscribe(()=>{
      alert("Product Registered Successfully");
    })
  }

  submit_order(bodyData: any){
    return this.http.post<any>("http://localhost:8086/api/orders/create",bodyData)
    .subscribe(()=>{
      alert("Order Saved in Database")
    })
  }
}
