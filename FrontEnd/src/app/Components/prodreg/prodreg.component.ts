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
  images: string[] = [];

  constructor(private http: HttpClient )
  {
   
  }




  upload_images(event:any){
    let base64:string[] = []
    for (let i = 0; i < event.target.files.length; i++) {
       let file = event.target.files[i];
       let reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = function () {
        base64.push(reader.result as string)
       };
       reader.onerror = function (error) {
         console.log('Error: ', error);
       };
    }
    this.images = base64
  }


  prod_reg()
  {

    let bodyData = {
      "name" : this.name,
      "description" : this.description,
      "price" : this.price,
      "images": this.images
    };
    this.http.post("http://localhost:8086/products/create",bodyData,{responseType: 'text'}).subscribe((resultData: any)=>
    {
        console.log(resultData);
        alert("Product Registered Successfully");
      
 
        this.name = '';
        this.description = '';
        this.price  = '';
        this.images = []
    });
  }

}
