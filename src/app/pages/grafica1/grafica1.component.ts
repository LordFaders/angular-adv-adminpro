import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

public label1: string[] = ['Pan', 'Refesco', 'Tacos']
public data1 = [10, 15, 40];
public backgroundColor1 = ['#f44336', '#ffd966', '#16537e'];

public label2: string[] = ['Pan', 'Refesco', 'Tacos']
public data2 = [25, 30, 20];
public backgroundColor2 = ['#fe4689', '#cc384d', '#9d4e5c'];

public label3: string[] = ['Pan', 'Refesco', 'Tacos']
public data3 = [5, 10, 30];
public backgroundColor3 = ['#a47d21', '#d7e923', '#04fedc'];


}
