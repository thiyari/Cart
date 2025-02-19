import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-user-delivery',
  standalone: false,
  
  templateUrl: './user-delivery.component.html',
  styleUrl: './user-delivery.component.scss'
})
export class UserDeliveryComponent implements OnInit{

    constructor(
      private http: HttpClient,
      private router: Router
    ){}
    
  ngOnInit(): void {
        this.http.get<any>(`${environment.SERVER_URI}/api/session`)
        .subscribe((res)=>{
              if(res.valid){
                  if (res.log_status === "user") {
                      // to do              
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
