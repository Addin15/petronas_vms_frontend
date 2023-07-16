import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PaginationService } from '../pagination.service';
import { Chart } from 'chart.js/auto';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public doughnutChart: any;
  public stackedColumnChart: any;
  public gaugeChart: any;

  constructor(private authService: AuthService, private route: Router, private paginationService: PaginationService) {
    this.paginationService.changePage(0);
    this.authService.isLoggedIn.subscribe((res) => {
      if (this.authService.user) {
        if (!this.authService.user!.is_staff) {
          this.route.navigateByUrl('/meetings');
        }
      }
    });
  }

  ngOnInit(): void {
    this.createChart();
    if (this.authService.user) {
      if (!this.authService.user!.is_staff) {
        this.route.navigateByUrl('/meetings');
      }
    }
  }

  createChart() {
    this.doughnutChart = new Chart("DoughnutChart", {
      type: 'doughnut', //this denotes tha type of chart
      data: {
        labels: [
          'Pre-Registered',
          'Non Pre-Registered',
        ],
        datasets: [{
          data: [82, 18],
          backgroundColor: [
            '#20C997',
            '#FFC55C',
          ],
          hoverOffset: 4
        }],
      },
      plugins: [
        {
          id: 'DoughnutChart',
          beforeDraw: function (chart, args, options) {
            var width = chart.width, height = chart.height, ctx = chart.ctx;
            ctx.restore();
            var fontSize = 2;
            ctx.font = `bold ${fontSize}em sans-serif`;
            ctx.textBaseline = "middle";
            var text = "82%", textX = Math.round((width - ctx.measureText(text).width) / 2), textY = height / 2;
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        },
        {
          id: 'DoughnutChart',
          beforeDraw: function (chart, args, options) {
            var width = chart.width, height = chart.height, ctx = chart.ctx;
            ctx.restore();
            var fontSize = 1;
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            var text = "Pre-Registered", textX = Math.round((width - ctx.measureText(text).width) / 2), textY = height / 1.7;
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }
      ],
    });


    this.gaugeChart = new Chart("GaugeChart", {
      type: 'doughnut',
      data: {
        labels: ["Detractors", "Passives", "Promoters"],
        datasets: [{
          label: 'Scores',
          data: [60, 20, 20],
          backgroundColor: ["#FF4E4E", "#FFA500", "#20C997"]
        }]
      },
      options: {
        cutout: 130,
        rotation: 270, // start angle in degrees
        circumference: 180, // sweep angle in degrees
      },
      plugins: [
        {
          id: 'DoughnutChart',
          beforeDraw: function (chart, args, options) {
            var width = chart.width, height = chart.height, ctx = chart.ctx;
            ctx.restore();
            var fontSize = 2;
            ctx.font = `bold ${fontSize}em sans-serif`;
            ctx.textBaseline = "middle";
            var text = "85", textX = Math.round((width - ctx.measureText(text).width) / 2), textY = height / 1.45;
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        },
        {
          id: 'DoughnutChart',
          beforeDraw: function (chart, args, options) {
            var width = chart.width, height = chart.height, ctx = chart.ctx;
            ctx.restore();
            var fontSize = 1;
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";
            var text = "Excellent", textX = Math.round((width - ctx.measureText(text).width) / 2), textY = height / 1.3;
            ctx.fillText(text, textX, textY);
            ctx.save();
          }
        }
      ],
    });

    this.stackedColumnChart = new Chart("StackedColumnChart", {
      type: 'bar',
      data: {
        labels: ['9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM'],
        datasets: [
          {
            label: 'Pre-Registered',
            data: [5, 10, 13, 21, 7, 19, 23, 4, 5, 8, 4, 2],
            backgroundColor: '#20C997',
          },
          {
            label: 'Non Pre-Registered',
            data: [5, 10, 13, 21, 7, 19, 23, 4, 5, 8, 4, 2],
            backgroundColor: '#FFC55C',
          },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
    });
  }


}
