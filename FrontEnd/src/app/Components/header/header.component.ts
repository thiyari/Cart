import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { LocalService } from '../../service/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: false,
  
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{

  public totalItem: number = 0;
  public searchTerm: string = "";
  constructor(
    private cartService: CartService,
    private session: LocalService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
  }
  search(event: any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    this.cartService.search.next(this.searchTerm)
  }

  session_verify(){
    const mail_id = this.session.getWithExpiry("login_session");
    if(mail_id){
      window.open("/user-orders", '_blank', 'location=yes,height=auto,width=auto,scrollbars=yes');
    } else {
      this.router.navigate(['/login'])
    }
  }
}
