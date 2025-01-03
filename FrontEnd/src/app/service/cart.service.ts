import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemList: any=[]
  public productsList = new BehaviorSubject<any>([]);
  constructor() { }
  getProducts(){
    return this.productsList.asObservable()
  }
  setProducts(product: any){
    this.cartItemList.push(...product);
    this.productsList.next(product);
  }
  addtocart(product: any){
    this.cartItemList.push(product);
    this.productsList.next(this.cartItemList);
    this.getTotalPrice();
  }
  getTotalPrice():number{
    let grandTotal = 0
    this.cartItemList.map((a:any)=>{
      grandTotal += a.total; 
    })
    return grandTotal
  }
  removeCartItem(product: any){
    this.cartItemList.map((a:any,index:any)=>{
      if(product._id===a._id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productsList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productsList.next(this.cartItemList);
  }
}
