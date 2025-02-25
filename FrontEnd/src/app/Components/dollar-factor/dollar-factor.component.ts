import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dollar-factor',
  standalone: false,
  
  templateUrl: './dollar-factor.component.html',
  styleUrl: './dollar-factor.component.scss'
})
export class DollarFactorComponent implements OnInit{

  constructor(     
    private api: ApiService,
    private http: HttpClient
  ){}
  ngOnInit(): void {

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
