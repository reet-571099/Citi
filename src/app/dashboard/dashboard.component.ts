import { Component, OnInit, ViewChild } from '@angular/core'
import { DataService } from '../service/data.service';
import { savedData } from '../cart/cart.component';
import {MessageService} from 'primeng/api';
import { UIChart, ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart') chart: UIChart; 
  first = 0;
  rows = 10;

  data:any;
  hvar:number;
   selectedrow:savedData;
   list:savedData[];
   PrFilter:0;
   PrTimeout:any;
   MrFilter: 0;
   MrTimeout: any;
   scrollableCols:any;
   isActive:boolean=false;
   icons:string[]=[];
   pageSizeOptions = [10, 25, 50, { showAll: "All" }];
  constructor( public dataservice:DataService,private messageService: MessageService) { 
  }
  cols = [
    { field: "symbol", header: "Company Name" },
    { field: "bse", header: "BSE" },
    { field: "nse", header: "NSE" },
    { field: "difference", header: "Arbitrage" }
  
  ];
 ngOnInit(): void {

    this.dataservice.gettabledata().subscribe (
      data=>{ this.data = data;
      console.log("INSIDE");
      this.getgraph();
      this.chart.refresh();
    }
    ); 
    console.log("OUTSIDE");
    //  
     console.log("HELLO COMPLETED GRAPH");
//  setTimeout(
//   function(){ 
//     location.reload(); 
//   }, 45000);  
}
data2:any;
lab:string[]=[];
nsedata:number[]=[];
bsedata:number[]=[];
value=100;
getgraph()
{
  console.log(this.data[1][0].symbol);
   for(var i=0;i<50;i++)
   {
     this.lab.push(this.data[1][i].symbol);
     
     this.nsedata.push(this.data[1][i].difference);
     console.log(this.nsedata);
    //  this.bsedata.push(this.data[i].bse);
    //  console.log(this.bsedata);
   }
  console.log("FOR LOOP BAHAR");
  this.data2 = {

    labels: this.lab,
  
    datasets: [
        {
            label: 'Arbitrage',
            data: this.nsedata,
            fill: true,
             borderColor: '#565656'
        },
        // {
        //     label: 'BSE',
        //     data: this.bsedata,
        //     fill: false,
        //     borderColor: '#565656'
        // }
    ]
}
this.chart.refresh();
console.log(this.data2);

}

selectData(event) {
  this.messageService.add({severity: 'info', summary: 'Data Selected', 'detail': this.data2.datasets[event.element._datasetIndex].data[event.element._index]});
}


getdata()
{
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
  dt.filter(event.value, 'nse', 'gt');
}, 250);
}

onPrChange(event, dt) {
  if (this.PrTimeout) {
    clearTimeout(this.PrTimeout);
  }
  
  this.PrTimeout = setTimeout(() => {
    dt.filter(event.value, 'bse', 'gt');
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
  return this.first === (this.data[0].length - this.rows);
}

isFirstPage(): boolean {
  return this.first === 0;
}

icon = 'favorite_border';
public changeIcon(dt:number, newIcon: string) {
  if(this.data[0][dt].like==1)
  {
    this.icon=newIcon;
  }
}


savebyid(row,dt)
  {
    console.log("DELETE "+dt+ " "+ this.data[0][dt].like);

    if(this.data[0][dt].like==1)
     {
            this.data[0][dt].like=0;
            this.dataservice.saveCompany(this.data[0][dt].symbol).subscribe (
              data => {
                console.log("Deleted")
              }
            );

     }
     else
     {
       this.data[0][dt].like=1;
       this.dataservice.saveCompany(this.data[0][dt].symbol).subscribe (
        data => {
          console.log("SAVED")
        }
      );
     }
     console.log("DELETE "+dt+ " "+ this.data[0][dt].like);      
            

  }

    
}