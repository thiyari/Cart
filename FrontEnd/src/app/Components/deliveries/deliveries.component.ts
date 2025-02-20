import { Component, OnInit } from '@angular/core';
import { AggregationService } from '../../service/aggregation.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deliveries',
  standalone: false,
  
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.scss'
})
export class DeliveriesComponent implements OnInit{
  aggregation: any[] = []

    constructor(
      private transactions: AggregationService,
      private http: HttpClient, 
      private router: Router
    ){}  
  
  ngOnInit(): void {
      this.http.get<any>(`${environment.SERVER_URI}/api/session`)
      .subscribe((res)=>{
            if(res.valid){
                if (res.log_status === "admin") {
                  this.aggregation = this.transactions.merge_admindata();
                  // sorting the result according to datetime in ascending order
                  this.aggregation.sort((a:any, b:any) =>  new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
                  // Below is an Alternative method for the descending order
                  //var result = this.aggregation.sort((a:any,b:any)=>b.createdAt < a.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0)
                  this.transactions.setData(this.aggregation) 
              }
            } else {
              this.router.navigate(['/login'])
            }
      })    
  }

  formatedDate = (savedTime:any) => {
    const date = new Date(savedTime).toLocaleString(
      "gu-IN",
      {
        timeStyle: "medium",
        dateStyle: "short",
      }
    );
    return date
  }

  onDelete(orderid: any){

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
