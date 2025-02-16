import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-payment-transactions',
  standalone: false,
  
  templateUrl: './payment-transactions.component.html',
  styleUrl: './payment-transactions.component.scss'
})
export class PaymentTransactionsComponent implements OnInit{

  record: any;
  transaction_status: any;

  constructor(
    private api: ApiService,
    private http: HttpClient, 
    private router: Router,
    private route: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.http.get<any>(`${environment.SERVER_URI}/api/session`)
    .subscribe((res)=>{
          if(res.valid){
              if (res.log_status === "admin") {
                this.transaction_status = this.route.snapshot.params["transactionstatus"]; 
                const reference_id = this.route.snapshot.params["referenceid"]; 
                this.api.phonepe_txn()
                .subscribe(res=>{
                  if (res.message === "Success"){
                      this.record = res.records.find((item:any)=>(item.referenceid === reference_id))
                    }
                  });
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
