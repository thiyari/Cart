import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { ActivatedRoute } from '@angular/router';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-view-request',
  standalone: false,
  
  templateUrl: './view-request.component.html',
  styleUrl: './view-request.component.scss'
})
export class ViewRequestComponent implements OnInit{
  public order:any;
  public mail_id:any;
  constructor(
        private api: ApiService,
        private route: ActivatedRoute,
        private session: LocalService
  ){}

  ngOnInit(): void {
    const order_id = this.route.snapshot.params['orderid'];
    this.api.getOrders()
    .subscribe(res=>{
      if (res.message === "Success"){
        this.order = res.records.find((item:any)=>JSON.stringify(item.orderid)===order_id)
        }
      })
      this.mail_id = this.session.getWithExpiry("login_session");
  }

  logout(){
    this.session.clearData();
    window.close();
  }

  send_message(){
    
  }
}
