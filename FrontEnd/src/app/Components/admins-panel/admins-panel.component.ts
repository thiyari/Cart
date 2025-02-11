import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-admins-panel',
  standalone: false,
  
  templateUrl: './admins-panel.component.html',
  styleUrl: './admins-panel.component.scss'
})
export class AdminsPanelComponent implements OnInit{

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
