import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prods',
  standalone: false,
  
  templateUrl: './prods.component.html',
  styleUrl: './prods.component.scss'
})
export class ProdsComponent implements OnInit {
products: any[] = [];
searchText: string = "";
filteredResult: any[] = []

  constructor(     
    private api: ApiService,
    private http: HttpClient, 
    private router: Router
  ){}

  ngOnInit(): void {
    this.http.get<any>(`${environment.SERVER_URI}/api/session`)
    .subscribe((res)=>{
          if(res.valid){
              if (res.log_status === "admin") {
                this.search()
            }
          } else {
            this.router.navigate(['/login'])
          }
    })
  }

  searchKey(data: string) {
    this.searchText = data;
    this.search();
  }

  search() {
    this.api.getProducts()
    .subscribe(res=>{
      if (res.message === "Success"){
            this.products = res.records
        }
      })
    // sorting the result according to datetime in descending order
    var result = this.products.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    this.filteredResult = this.searchText === "" ? result : result.filter((x:any) => {
      return (
        JSON.stringify(x.pid).includes(this.searchText)
      )
    });
  }


  formatedDate = (savedTime:any) => {
    const date = new Date(savedTime).toLocaleString(
      "gu-IN",
      {
        timeStyle: "medium",
        dateStyle: "short",
      }
    );
    return date
  }

  logout(){
      this.http.get<any>(`${environment.SERVER_URI}/api/logout`)
          .subscribe((res)=>{
            if(res.valid){
              window.close();
            } else {
              alert("Logout Failed");
            }
          })
    }

}
