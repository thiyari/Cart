import { Component } from '@angular/core';
import { ApiService } from '../../service/api.service';

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

  constructor(private api: ApiService ){ }

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
    const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString();
    const datetime = currDate+currTime
    const random_digits = datetime.replace(/[^0-9]/g, "")
    const pid = Math.floor(10 + Math.random() * 90)+random_digits;
    let bodyData = {
      "pid": pid,
      "name" : this.name,
      "description" : this.description,
      "price" : this.price,
      "images": this.images
    };
    this.api.addProduct(bodyData)
    this.name = '';
    this.description = '';
    this.price  = '';
    this.images = []
  }
}


