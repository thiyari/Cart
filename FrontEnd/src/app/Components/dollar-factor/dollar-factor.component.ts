import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dollar-factor',
  standalone: false,
  
  templateUrl: './dollar-factor.component.html',
  styleUrl: './dollar-factor.component.scss'
})
export class DollarFactorComponent implements OnInit{
  dollar_factor: any;
  toggle: boolean = false;
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
                // to do
            }
          } else {
            this.router.navigate(['/login'])
          }
    })
  }

  onEdit(){
    this.toggle = true;
  }
  onSubmit(){
    this.toggle = false;
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
