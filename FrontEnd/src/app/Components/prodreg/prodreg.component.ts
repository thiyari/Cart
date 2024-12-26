import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-prodreg',
  standalone: false,
  
  templateUrl: './prodreg.component.html',
  styleUrl: './prodreg.component.scss'
})
export class ProdregComponent {
  name: string ="";
  description: string ="";
  price: string = "";

  constructor(private http: HttpClient )
  {
   
  }

  prod_reg()
  {
  
    let bodyData = {
      "name" : this.name,
      "description" : this.description,
      "price" : this.price
    };
    this.http.post("http://localhost:8086/products/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Successfully");
      
 
        this.name = '';
        this.description = '';
        this.price  = '';
    });
  }

}
