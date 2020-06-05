import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'historicalSimulation';


public icon = 'favorite_border'; 


public changeIcon(newIcon: string) {
    this.icon = newIcon; 
}
}
