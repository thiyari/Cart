import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-prod-edit',
  standalone: false,
  
  templateUrl: './prod-edit.component.html',
  styleUrl: './prod-edit.component.scss'
})
export class ProdEditComponent implements OnInit{

  constructor(
    private api: ApiService,
    private http: HttpClient, 
    private router: Router
   ){ }  
  
  ngOnInit(): void {
    this.http.get<any>(`${environment.SERVER_URI}/api/session`)
    .subscribe((res)=>{
          if(res.valid){
              if (res.log_status === "admin") {
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
