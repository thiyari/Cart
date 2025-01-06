import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-phonepe-success',
  standalone: false,
  
  templateUrl: './phonepe-success.component.html',
  styleUrl: './phonepe-success.component.scss'
})

export class PhonepeSuccessComponent implements OnInit{

  public transaction: any;
  public order: any; 
  public response: any;

  constructor(private api: ApiService, private route: ActivatedRoute){}
  
  ngOnInit(): void {
    const reference_id = this.route.snapshot.params["referenceid"]; 
    this.api.phonepe_txn()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.transaction = res.records.find((item:any)=>{return(item.referenceid===reference_id)})
        }
      });

    this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.order = res.records.find((item:any)=>{return(item.referenceid === reference_id)})
        }
      })
      this.response = { ...this.transaction, ...this.order };
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

}