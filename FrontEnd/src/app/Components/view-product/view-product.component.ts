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
  options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  optionSelected: any = 1;

  constructor(private api: ApiService, private route: ActivatedRoute, private cartService: CartService){}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.product = this.api.getProducts()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.product = res.records.find((item:any)=>
          JSON.stringify(item.pid) === id
        );
      }
    })
  }

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "dots":true,
    "autoplay": true,
    "autoplaySpeed": 5000,
    "pauseOnHover": true,
    "infinite": true,
    "draggable": true,
    "swipe	":true,
    "arrows": true,
    "responsive": [
      {
      "breakpoint": 992,
      "settings": {
        "arrows": true,
        "infinite": true,
        "slidesToShow": 1,
        "slidesToScroll": 1
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

  onOptionsSelected(event: any){
    this.optionSelected = parseInt(event); //option value will be sent as event
    }
  
  addtocart(item: any){
    const totalvalue = parseFloat(this.product.price)*this.optionSelected
    const roundupvalue = Math.ceil(totalvalue * 100) / 100
    Object.assign(this.product,{quantity:this.optionSelected,total:roundupvalue})
    this.cartService.addtocart(item);
  }

}
