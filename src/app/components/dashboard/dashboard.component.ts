import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  raceChartData1 = {
    labels: ['Race 1', 'Race 2', 'Race 3', 'Race 4', 'Race 5'],
    datasets: [
      {
        data: [12, 19, 3, 5, 2],
        label: 'Horse Races 1',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  };

  raceChartData2 = {
    labels: ['Race 1', 'Race 2', 'Race 3', 'Race 4', 'Race 5'],
    datasets: [
      {
        data: [10, 15, 5, 7, 3],
        label: 'Horse Races 2',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  raceChartData3 = {
    labels: ['Race 1', 'Race 2', 'Race 3', 'Race 4', 'Race 5'],
    datasets: [
      {
        data: [14, 22, 6, 8, 4],
        label: 'Horse Races 3',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  raceChartData4 = {
    labels: ['Race 1', 'Race 2', 'Race 3', 'Race 4', 'Race 5'],
    datasets: [
      {
        data: [16, 12, 7, 6, 5],
        label: 'Horse Races 4',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgba(255, 206, 86, 1)',
        borderWidth: 1
      }
    ]
  };

  chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
}