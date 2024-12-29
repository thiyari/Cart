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
    .subscribe((resultData:any)=>{
      console.log(resultData);
      alert("Product Registered Successfully");
    })
  }
}
