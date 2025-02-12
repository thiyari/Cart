import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prodreg',
  standalone: false,
  
  templateUrl: './prodreg.component.html',
  styleUrl: './prodreg.component.scss'
})
export class ProdregComponent implements OnInit {
  name: string ="";
  description: string ="";
  price: string = "";
  images: string[] = [];
  files: string[] = [];

  constructor(
    private api: ApiService,
    private http: HttpClient, 
    private router: Router
   ){ }
  ngOnInit(): void {
    this.http.get<any>(`${environment.SERVER_URI}/api/session`)
    .subscribe((res)=>{
          if(res.valid){
              if (res.log_status === "user") {
                this.router.navigate(['/login'])
            }
          } else {
            this.router.navigate(['/login'])
          }
    })
  }

  upload_images(event:any){
    let base64:string[] = []
    this.files.map((file:any)=>{console.log(file.name)})
    for (let i = 0; i < event.target.files.length; i++) {
       this.files.push(event.target.files[i].name)
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
    if (this.name === "" || this.description === "" || this.price === "" || this.files.length === 0){
      alert("Please the fields and upload an image")
    }
    else {
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
    }
    this.name = '';
    this.description = '';
    this.price  = '';
    this.images = []  
  }


  logout(){
    this.http.get<any>(`${environment.SERVER_URI}/api/logout`)
        .subscribe((res)=>{
          if(res.valid){
            window.close();
          } else {
            alert("Logout Failed");
          }
        })
  }
}


