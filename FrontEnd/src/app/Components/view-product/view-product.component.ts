import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-view-product',
  standalone: false,
  
  templateUrl: './view-product.component.html',
  styleUrl: './view-product.component.scss'
})


export class ViewProductComponent implements OnInit{

  public product: any;

  constructor(private api: ApiService, private route: ActivatedRoute, private cartService: CartService){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.product = this.api.getProducts()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.product = res.records.find((item:any)=>
          item._id === id
        );
        Object.assign(this.product,{quantity:1,total:parseFloat(this.product.price)})
      }
    })
  }

  addtocart(item: any){
    this.cartService.addtocart(item);
  }

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "responsive": [
      {
      "breakpoint": 992,
      "settings": {
        "arrows": true,
        "infinite": true,
        "slidesToShow": 3,
        "slidesToScroll": 3
      },
      },
      {
        "breakpoint": 768,
        "settings": {
          "arrows": true,
          "infinite": true,
          "slidesToShow": 1,
          "slidesToScroll": 1
        },
        }
    ]

  }

}
