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


  imagebased64 = async (file:File)=>{
    const reader = new FileReader()
    await reader.readAsDataURL(file)
    const data = new Promise((resolve,reject)=>{
      reader.onload = () => resolve(reader.result)
      reader.onerror = (err) => reject(err)
    })
    return data
  }


  upload_images = async(event:any)=>{
    let images = []
    for (let i = 0; i < event.target.files.length; i++) {
       images.push(await this.imagebased64(event.target.files[i]))
    }
  }


  prod_reg()
  {
    console.log(this.images)

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
