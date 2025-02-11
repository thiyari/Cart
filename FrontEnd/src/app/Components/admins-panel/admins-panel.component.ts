import { Component, OnInit } from '@angular/core';
import { LocalService } from '../../service/local.service';

@Component({
  selector: 'app-admins-panel',
  standalone: false,
  
  templateUrl: './admins-panel.component.html',
  styleUrl: './admins-panel.component.scss'
})
export class AdminsPanelComponent implements OnInit{

  constructor(     
    private session: LocalService
  ){}

  ngOnInit(): void {

  }

  logout(){
    this.session.clearData();
    window.close();
  }
}
