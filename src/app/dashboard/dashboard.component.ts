import { Component, OnInit } from '@angular/core'
import { SortEvent } from 'primeng/api';
import { DataService } from '../service/data.service';
 export class portfolioData {
  constructor(
    public dt: string,
    public cp: number,
    public pv:number,
    public mr:number
  ){

  }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
        
  data;
  hvar:number;
   selectedrow:portfolioData;
   list:portfolioData[];
   MrFilter: number;
   MrTimeout: any;
   scrollableCols:any;
   pageSizeOptions = [10, 25, 50, { showAll: "All" }];
  constructor( public dataservice:DataService) { }
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
  
  
  
this.scrollableCols = [
  { field: 'year', header: 'Year' },
  { field: 'brand', header: 'Brand' },
  { field: 'color', header: 'Color' }
];
  
  
  
  }
   
    customSort(event: SortEvent) {
      event.data.sort((data1, data2) => {
          let value1 = data1[event.field];
          let value2 = data2[event.field];
          let result = null;

          if (value1 == null && value2 != null)
              result = -1;
          else if (value1 != null && value2 == null)
              result = 1;
          else if (value1 == null && value2 == null)
              result = 0;
          else if (typeof value1 === 'string' && typeof value2 === 'string')
              result = value1.localeCompare(value2);
          else
              result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

          return (event.order * result);
      });
  }


onRowSelect(event) {
   // this.messageService.add({severity:'info', summary:'Car Selected', detail:'dt: ' + event.data.dt});
}

onRowUnselect(event) {
    
}
first=0;
rows=10;



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
}