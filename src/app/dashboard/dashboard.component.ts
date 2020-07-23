import { Component, OnInit } from '@angular/core'
import { DataService } from '../service/data.service';

 export class portfolioData {
  constructor(
    public dt: number,
    public cp: number,
    public pv:number,
    public mr:number,
    public like:number
  ){

  }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  first = 0;
  rows = 10;

  data;
  hvar:number;
   selectedrow:portfolioData;
   list:portfolioData[];
   PrFilter:number;
   PrTimeout:any;
   MrFilter: number;
   MrTimeout: any;
   scrollableCols:any;
   isActive:boolean=false;
   icons:string[]=[];
   pageSizeOptions = [10, 25, 50, { showAll: "All" }];
  constructor( public dataservice:DataService) { 
  }
  cols = [
    { field: "dt", header: "ID" },
    { field: "cp", header: "Company Name" },
    { field: "pv", header: "BSE" },
    { field: "pv", header: "NSE" },
    { field: "mr", header: "Arbitrage" },
  
  ];
 ngOnInit(): void {

    this.dataservice.gettabledata().subscribe (
      data=> this.data = data
    ); 
    console.log("HELLO INSIDE INIT");
  // this.getdata();
   console.log("HELLO INSIDE2 INIT");
 setTimeout(
  function(){ 
    location.reload(); 
  }, 36000);  
}
getdata()
{
  console.log("HELLO"+this.data);
  for(var i=0;i<50;i++)
  {
   console.log("HELLO"+this.data[0].like);
    if(this.data[i].like==1)
    {
      this.icons.push('favorite');
      console.log("ICON"+this.icons[i]);
    }
    else
    {
    this.icons.push('favorite_border');
    console.log("ICON"+this.icons[i]);
  }
 }
}
onRowSelect(event) {
   // this.messageService.add({severity:'info', summary:'Car Selected', detail:'dt: ' + event.data.dt});
}

onRowUnselect(event) {
    
}


FilterUtils: any['custom'] = (value, filter): boolean => {
  if (filter === undefined || filter === null || filter.trim() === '') {
      return true;
  }

  if (value === undefined || value === null) {
      return false;
  }
  
  return parseInt(filter) > value;
}

onMrChange(event, dt) {
if (this.MrTimeout) {
  clearTimeout(this.MrTimeout);
}

this.MrTimeout = setTimeout(() => {
  dt.filter(event.value, 'mr', 'gt');
}, 250);
}

onPrChange(event, dt) {
  if (this.PrTimeout) {
    clearTimeout(this.PrTimeout);
  }
  
  this.PrTimeout = setTimeout(() => {
    dt.filter(event.value, 'pv', 'gt');
  }, 250);
  }
  


next() {
  this.first = this.first + this.rows;
}

prev() {
  this.first = this.first - this.rows;
}

reset() {
  this.first = 0;
}

isLastPage(): boolean {
  return this.first === (this.data.length - this.rows);
}

isFirstPage(): boolean {
  return this.first === 0;
}

icon = 'favorite_border';
public changeIcon(dt:number, newIcon: string) {
  if(this.data[dt].like==1)
  {
    this.icon=newIcon;
  }
}


savebyid(row,dt)
  {
    console.log("DELETE "+dt+ " "+ this.data[dt].like);

    if(this.data[dt].like==1)
     {
            this.data[dt].like=0;
            this.dataservice.saveCompany(this.data[dt].cp,this.data[dt].like).subscribe (
              data => {
                console.log("Deleted")
              }
            );

     }
     else
     {
       this.data[dt].like=1;
       this.dataservice.saveCompany(this.data[dt].cp,this.data[dt].like).subscribe (
        data => {
          console.log("SAVED")
        }
      );
     }
     console.log("DELETE "+dt+ " "+ this.data[dt].like);      
            

  }

    
}