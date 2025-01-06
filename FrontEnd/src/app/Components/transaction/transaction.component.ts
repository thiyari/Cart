import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction',
  standalone: false,
  
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss'
})
export class TransactionComponent implements OnInit{

  public orderid: any; 
  constructor(private api: ApiService, private route: ActivatedRoute){}
  
  ngOnInit(): void {

    const reference_id = this.route.snapshot.queryParams["referenceid"];
    console.log(reference_id)
  }
}
