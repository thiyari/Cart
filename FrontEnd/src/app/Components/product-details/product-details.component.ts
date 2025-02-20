import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-details',
  standalone: false,
  
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit{
  products: any[] = [];

  constructor(     
    private api: ApiService,
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.http.get<any>(`${environment.SERVER_URI}/api/session`)
    .subscribe((res)=>{
          if(res.valid){
              if (res.log_status === "admin") {
                const pid = this.route.snapshot.params['pid'];
                this.api.getProducts()
                .subscribe(res=>{
                  if (res.message === "Success"){
                        this.products = res.records.find((item:any)=>JSON.stringify(item.pid)===pid)
                    }
                  })
            }
          } else {
            this.router.navigate(['/login'])
          }
    })

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
