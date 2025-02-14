import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prods',
  standalone: false,
  
  templateUrl: './prods.component.html',
  styleUrl: './prods.component.scss'
})
export class ProdsComponent implements OnInit {
products: any;
  constructor(     
    private api: ApiService,
    private http: HttpClient, 
    private router: Router
  ){}
  ngOnInit(): void {
    this.http.get<any>(`${environment.SERVER_URI}/api/session`)
    .subscribe((res)=>{
          if(res.valid){
              if (res.log_status === "admin") {
                this.api.getProducts()
                .subscribe(res=>{
                  if (res.message === "Success"){
                        this.products = res.records
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
