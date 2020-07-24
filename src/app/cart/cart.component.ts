import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  data;
  constructor( public dataservice:DataService) { 
  }

  ngOnInit(): void {

    this.dataservice.gettabledata().subscribe (
      data=> this.data = data
    );  
}

deletebyid(cp:string)
  {
     console.log("DELETE "+cp+" ");
     this.dataservice.deletedata(cp).subscribe(
       response=>
       {
         this.data=response;
         console.log("deletva");
         location.reload(); 
       }
     );
   }
  }    

