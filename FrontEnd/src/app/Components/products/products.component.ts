import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-products',
  standalone: false,
  
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit {
  public productsList: any;
  constructor(private api: ApiService){}

  ngOnInit(): void {
    this.api.getProducts()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.productsList = res.records;
      }
    })
  }

}
