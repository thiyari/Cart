import { Component, OnInit } from '@angular/core';
import { AggregationService } from '../../service/aggregation.service';
import { ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-view-order',
  standalone: false,
  
  templateUrl: './view-order.component.html',
  styleUrl: './view-order.component.scss'
})
export class ViewOrderComponent implements OnInit{
  public data:any;
  constructor(
    private transactions: AggregationService,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    const order_id = this.route.snapshot.params["orderid"]; 
    var result =this.transactions.getData();
    this.data = result.find((x:any)=>{
      return(x.orderid == parseInt(order_id))
    })
    console.log(this.data)
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
  downloadAsPDF(){
    let data = document.getElementById('gen_pdf')!;  
    html2canvas(data).then(canvas => {
    const contentDataURL = canvas.toDataURL('image/png')  // 'image/jpeg' for lower quality output.
    //let pdf = new jspdf('l', 'cm', 'a4'); //Generates PDF in landscape mode
    let pdf = new jspdf('p', 'cm', 'a4'); // Generates PDF in portrait mode
    pdf.addImage(contentDataURL, 'PNG', 1, 2, 19, 17);  
    pdf.save(this.data.referenceid+'.pdf');   
  }); 
  }
}
