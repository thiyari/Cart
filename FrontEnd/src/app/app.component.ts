import { Component } from '@angular/core';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  id: any;
  title = 'FrontEnd';
  showHeader=true;
  constructor(private router:Router){
    router.events.subscribe(
      (val:any)=>{
          if(val instanceof ActivationEnd){
            this.id = val.snapshot.params['id']
          }
          if(val instanceof NavigationEnd){
            if(val.url === '/' ||
              val.url === '/products' ||
              val.url === `/product/${this.id}` || 
              val.url === '/cart' || 
              val.url === '/orders'){
              this.showHeader=true
            } 
            else {
              this.showHeader=false
            }
          }
      }
    )
  }
}
