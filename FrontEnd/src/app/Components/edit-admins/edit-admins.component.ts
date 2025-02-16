import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-admins',
  standalone: false,
  
  templateUrl: './edit-admins.component.html',
  styleUrl: './edit-admins.component.scss'
})
export class EditAdminsComponent implements OnInit{

  name: string = "";
  email: string = "";
  phone: string = "";

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
              const id = this.route.snapshot.params['id'];
              this.api.getAdmins()
              .subscribe((res:any)=>{
                if (res.message === "Success"){
                    const record = res.records.find((item:any)=>item._id === id)
                    this.name = record.name;
                    this.email = record.email;
                    this.phone = JSON.stringify(record.phone);
                }
              }) 
            }
          } else {
              this.router.navigate(['/login'])
          }
      })
    }

  edit_admin(){

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
