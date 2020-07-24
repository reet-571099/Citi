import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { portfolioData } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  data:portfolioData[]=[];
  constructor( public dataservice:DataService) { 
  }

  ngOnInit(): void {
    this.refreshlist();  
}
refreshlist()
{
  this.dataservice.gettabledata().subscribe (
    data=> this.data = data
  );
}

deletebyid(cp:number)
  {
     var temp:portfolioData[]=[];
     var k:number=0;
     this.data.forEach(function (value) {
      if(value.cp!=cp)
      {
           temp[k]=value;
           k++;
      }
  }); 
      this.data=temp;
      this.dataservice.senddata(cp).subscribe(
        response=>console.log("Data sent")
      );
  }





  }    

