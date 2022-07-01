import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartConfiguration, ChartData, ChartEvent, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import {color} from "chart.js/helpers";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  @Input()
  public headerChart: string = 'График уровней пользователей:';

  allUsers = JSON.parse(localStorage.getItem('Users')).map((i: any) => i.login);
  allLevels = JSON.parse(localStorage.getItem('Users')).map((i: any) => i.level);
  allExperience = JSON.parse(localStorage.getItem('Users')).map((i: any) => i.allExperience);

  test: any = [];

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
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
  public chartType: boolean = false;
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  public barChartData: ChartData<'bar'> = {
    labels: this.allUsers,
    datasets: [
      {
        data: this.allLevels,
        label: 'Уровень',
        backgroundColor: 'rgba(146, 189, 221)',
        hoverBackgroundColor: 'rgba(152, 168, 195)',
      },
    ]
  };

  public changeChart(): void {
    this.chartType = !this.chartType;
    if (this.chartType === true) {
      this.headerChart = 'График накопленного опыта с учетом всех уровней:';
      this.barChartData.datasets[0] = {
        data: this.allExperience, label: 'Опыт'
      }
      this.chart?.update();
    } else {
      this.headerChart = 'График уровней пользователей:';
      this.barChartData.datasets[0] = {
        data: this.allLevels,
        label: 'Уровень',
        backgroundColor: 'rgba(146, 189, 221)',
        hoverBackgroundColor: 'rgba(152, 168, 195)',
      }
      this.chart?.update();
    }
  }

  ngOnInit(): void {
  }
}
