import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { portfolioData } from '../dashboard/dashboard.component';
//import { savedData } from '../cart/cart.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor( public http:HttpClient) { }

  gettabledata(){
    return this.http.get<portfolioData[]>("http://localhost:8080/hllo");
   //return this.http.get<portfolioData[]>("http://localhost:8080/portfolioData");
  }

  saveCompany(ind:string,num:number)
  {
    return this.http.get<number>(`http://localhost:8080/company/${ind}`);
  }

  // getsaveddata(){
  //   return this.http.get<savedData[]>("http://localhost:8080/hllo");
  //  //return this.http.get<portfolioData[]>("http://localhost:8080/portfolioData");
  // }

  deletedata(ind:string)
  {
    return this.http.get<any>(`http://localhost:8080/company/${ind}`);
  }


}
