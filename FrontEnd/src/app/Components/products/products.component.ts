import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-products',
  standalone: false,
  
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  public productsList: any;
  constructor(private api: ApiService, private cartService: CartService){}

  ngOnInit(): void {
    this.api.getProducts()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.productsList = res.records;
        this.productsList.forEach((a:any)=>{
          Object.assign(a,{quantity:1,total:a.price})
        })
      }
    })
  }
  addtocart(item: any){
    this.cartService.addtocart(item);
  }
}
