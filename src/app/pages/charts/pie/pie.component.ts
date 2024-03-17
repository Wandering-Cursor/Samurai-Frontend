import { Component } from '@angular/core';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  simplePieChart: any;
  simpleDonutChart: any;
  updatingDonutChart: any;
  monochromePieChart: any;
  gradientDonutChart: any;
  patternedDonutChart: any;
  semiDonutChart: any;
  pieWithImageChart: any;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Pie Charts', active: true }
    ];

    // Chart Color Data Get Function
    this._simplePieChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._simpleDonutChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._updatingDonutChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._monochromePieChart('["--tb-primary"]');
    this._gradientDonutChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._patternedDonutChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    this._pieWithImageChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-info"]');
  }

  // Chart Colors Set
  private getChartColorsArray(colors: any) {
    colors = JSON.parse(colors);
    return colors.map(function (value: any) {
      var newValue = value.replace(" ", "");
      if (newValue.indexOf(",") === -1) {
        var color = getComputedStyle(document.documentElement).getPropertyValue(newValue);
        if (color) {
          color = color.replace(" ", "");
          return color;
        }
        else return newValue;;
      } else {
        var val = value.split(',');
        if (val.length == 2) {
          var rgbaColor = getComputedStyle(document.documentElement).getPropertyValue(val[0]);
          rgbaColor = "rgba(" + rgbaColor + "," + val[1] + ")";
          return rgbaColor;
        } else {
          return newValue;
        }
      }
    });
  }

  /**
  * Simple Pie Chart
  */
  private _simplePieChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.simplePieChart = {
      series: [44, 55, 13, 43, 22],
      chart: {
        height: 300,
        type: "pie",
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      legend: {
        position: "bottom",
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: colors,
    };


    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._simplePieChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Simple Donut Chart
  */
  private _simpleDonutChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.simpleDonutChart = {
      series: [44, 55, 41, 17, 15],
      chart: {
        height: 300,
        type: "donut",
      },
      legend: {
        position: "bottom",
      },
      dataLabels: {
        dropShadow: {
          enabled: false,
        },
      },
      colors: colors,
    };


    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._simpleDonutChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  // Updating Donut Charts
  private _updatingDonutChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.updatingDonutChart = {
      series: [44, 55, 13, 33],
      chart: {
        height: 280,
        type: 'donut',
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        position: 'bottom'
      },
      colors: colors
    };


    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._updatingDonutChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');

    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Monochrome Pie Chart
  */
  private _monochromePieChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.monochromePieChart = {
      series: [25, 15, 44, 55, 41, 17],
      chart: {
        height: 300,
        type: 'pie',
      },
      labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      theme: {
        monochrome: {
          enabled: true,
          color: '#3762ea',
          shadeTo: 'light',
          shadeIntensity: 0.6
        }
      },

      plotOptions: {
        pie: {
          dataLabels: {
            offset: -5
          }
        }
      },
      title: {
        text: "Monochrome Pie",
        style: {
          fontWeight: 500,
        },
      },
      dataLabels: {
        formatter: function (val: any, opts: any) {
          var name = opts.w.globals.labels[opts.seriesIndex];
          return [name, val.toFixed(1) + '%'];
        },
        dropShadow: {
          enabled: false,
        }
      },
      legend: {
        show: false
      }
    };


    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._monochromePieChart('["--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Gradient Donut Chart
  */
  private _gradientDonutChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.gradientDonutChart = {
      series: [44, 55, 41, 17, 15],
      chart: {
        height: 300,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      legend: {
        position: "bottom",
        formatter: function (val: any, opts: any) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
      },
      title: {
        text: "Gradient Donut with custom Start-angle",
        style: {
          fontWeight: 500,
        },
      },
      colors: colors,
    };


    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._gradientDonutChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Patterned Donut Chart
  */
  private _patternedDonutChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.patternedDonutChart = {
      series: [44, 55, 41, 17, 15],
      chart: {
        height: 300,
        type: "donut",
        dropShadow: {
          enabled: true,
          color: "#111",
          top: -1,
          left: 3,
          blur: 3,
          opacity: 0.2,
        },
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
      labels: ["Comedy", "Action", "SciFi", "Drama", "Horror"],
      dataLabels: {
        dropShadow: {
          blur: 3,
          opacity: 0.8,
        },
      },
      fill: {
        type: "pattern",
        opacity: 1,
        pattern: {
          style: [
            "verticalLines",
            "squares",
            "horizontalLines",
            "circles",
            "slantedLines",
          ],
        },
      },
      states: {
        hover: {
        },
      },
      theme: {
        palette: "palette2",
      },
      title: {
        text: "Favourite Movie Type",
        style: {
          fontWeight: 500,
        },
      },
      legend: {
        position: "bottom",
      },
      colors: colors,
    };


    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._patternedDonutChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger", "--tb-info"]');

    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Pie Chart with Image Fill
  */
  private _pieWithImageChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.pieWithImageChart = {
      series: [44, 33, 54, 45],
      chart: {
        height: 300,
        type: "pie",
      },
      colors: colors,
      fill: {
        type: "image",
        opacity: 0.85,
        image: {
          src: [
            '../../../../../assets/images/small/img-1.jpg', '../../../../../assets/images/small/img-2.jpg', '../../../../../assets/images/small/img-3.jpg', '../../../../../assets/images/small/img-4.jpg'
          ],
          width: 25,
        },
      },
      stroke: {
        width: 4,
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#111"],
        },
        background: {
          enabled: true,
          foreColor: "#fff",
          borderWidth: 0,
        },
      },
      legend: {
        position: "bottom",
      },
    };


    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._pieWithImageChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-info"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  add() {
    const arr = this.updatingDonutChart.series.slice();
    arr.push(Math.floor(Math.random() * (100 - 1 + 1)) + 1);
    this.updatingDonutChart.series = arr;
  }

  remove() {
    const arr = this.updatingDonutChart.series.slice();
    arr.pop();
    this.updatingDonutChart.series = arr;
  }

  randomize() {
    this.updatingDonutChart.series = this.updatingDonutChart.series.map(() =>
    Math.floor(Math.random() * (100 - 1 + 1)) + 1
  );
  }

  reset() {
    this.updatingDonutChart.series = [44, 55, 13, 33];
  }

}
