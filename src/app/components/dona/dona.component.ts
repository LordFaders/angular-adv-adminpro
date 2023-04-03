import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})  
export class DonaComponent {
  
  @Input() title: string = 'Sin titulo';
  @Input('label') doughnutChartLabels: string[] = [];
  @Input('data') dataDonut: number[] = [];
  @Input('backgroundColor') backgroundColorDonut: string[] = [];
  charOptions = {
    resposive: true,
    maintainAspectRatio: false
  }; // TODO: evaluar si es candidato a ser @Input()
 
  constructor() {
    // Valores por defecto en caso no se setee nada desde otros componentes
    this.dataDonut = [350, 450, 100];
    this.doughnutChartLabels = ['Label1', 'Label2', 'Label3'];
    this.backgroundColorDonut = ['#6857E6', '#009FEE', '#F02059'];
  }
  ngOnInit(): void {
    // Aca seteamos los valores que vienen como @Input() al objeto doughnutChartData
    this.doughnutChartData.datasets[0].data = this.dataDonut;
    this.doughnutChartData.datasets[0].backgroundColor = this.backgroundColorDonut;
    this.doughnutChartData.labels = this.doughnutChartLabels;
  }
 
  public doughnutChartData: ChartData<'doughnut'> = {
  labels: this.doughnutChartLabels,
  datasets: [
    {
      data: this.dataDonut,
      backgroundColor: this.backgroundColorDonut
    },
  ]
  };
}
