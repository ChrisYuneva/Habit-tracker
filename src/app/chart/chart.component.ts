import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {color} from "chart.js/helpers";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: [ './chart.component.css' ],
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  allUsers = JSON.parse(localStorage.getItem('Users')).map((i:any) => i.login);
  allLevels = JSON.parse(localStorage.getItem('Users')).map((i:any) => i.level);
  allExperience = JSON.parse(localStorage.getItem('Users')).map((i:any) => i.experience);

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.allUsers,
    datasets: [
      { data: this.allLevels,
        label: 'Уровень',
        backgroundColor: 'rgba(146, 189, 221)',
        hoverBackgroundColor: 'rgba(152, 168, 195)',
      },
      { data: this.allExperience, label: 'Опыт' }
    ]
  };

  // events
  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  ngOnInit(): void {
    console.log(this.allUsers)
  }
}
