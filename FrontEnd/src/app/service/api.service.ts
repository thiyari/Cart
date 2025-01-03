import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private router: Router) { }

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
      this.router.navigate(['/payment'])
    })
  }
}
