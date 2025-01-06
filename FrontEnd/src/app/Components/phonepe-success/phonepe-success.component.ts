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

  public orderid: any; 
  public transaction: any;
  public order: any;

  constructor(private api: ApiService, private route: ActivatedRoute){}
  
  ngOnInit(): void {

    const reference_id = this.route.snapshot.params["referenceid"]; 
    this.transaction = this.api.phonepe_txn()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.transaction = res.records.find((item:any)=>
          JSON.stringify(item.referenceid) === reference_id
        )}
      })
    console.log(this.transaction)
    /*
    this.order = this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        res.records.find((item:any)=>
          JSON.stringify(item.referenceid) === reference_id
        )}
      })
        */
  }
}