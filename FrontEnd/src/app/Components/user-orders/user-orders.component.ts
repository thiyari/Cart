import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';

@Component({
  selector: 'app-user-orders',
  standalone: false,
  
  templateUrl: './user-orders.component.html',
  styleUrl: './user-orders.component.scss'
})
export class UserOrdersComponent implements OnInit {

  orders: any;
  response: any;
  transaction: any;
  constructor(private api: ApiService){}

  ngOnInit(): void {

    const mail_id = "manikanth578@gmail.com"; 

  }
    

}
