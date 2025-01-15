import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'FrontEnd';
  showHeader=true;
  constructor(private router:Router){

    router.events.subscribe(
      (val:any)=>{
        if(val instanceof NavigationEnd){
          if(val.url === '/prodreg'){
            this.showHeader=false
          }
        }
      }
    )
  }
}
