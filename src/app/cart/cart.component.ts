import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
export class savedData {
  constructor(
    public Symbol: number,
    public NSE: number,
    public BSE:number,
    public Arbitrage:number,
    public STOCKS:number,
    public Profit:number,
    public like:number
  ){

  }
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  data:any;
  constructor( public dataservice:DataService) { 
  }

  ngOnInit(): void {
    this.refreshlist();  
}
refreshlist()
{
  this.dataservice.getsaveddata().subscribe (
    data=> this.data = data
  );
}


deletebyid(cp:string)
  {
     var temp:savedData[]=[];
     var k:number=0;
     this.data.forEach(function (value) {
      if(value.Symbol!=cp)
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

