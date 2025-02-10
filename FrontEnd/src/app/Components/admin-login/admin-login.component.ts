import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-admin-login',
  standalone: false,
  
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent implements OnInit{

  email: any;
constructor(
      private session: LocalService
  
){}
ngOnInit(): void {

}
onSubmit(){
  this.session.setWithExpiry("login_session", {email: this.email, log_status: "admin"}, 3600000)
  window.open("/admin-orders", '_blank', 'location=yes,height=auto,width=auto,scrollbars=yes');
}

}
