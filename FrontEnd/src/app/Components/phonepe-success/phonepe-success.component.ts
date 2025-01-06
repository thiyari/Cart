import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phonepe-success',
  standalone: false,
  
  templateUrl: './phonepe-success.component.html',
  styleUrl: './phonepe-success.component.scss'
})

export class PhonepeSuccessComponent implements OnInit{

  public orderid: any; 
  constructor(private api: ApiService, private route: ActivatedRoute){}
  
  ngOnInit(): void {

    const reference_id = this.route.snapshot.queryParams["referenceid"];
    console.log(reference_id)
  }

}