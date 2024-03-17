import { Component } from '@angular/core';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.scss']
})
export class HeatmapComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  basicHeatmapChart: any;
  multipleSeriesChart: any;
  colorRangeChart: any;
  rangeWithoutShadesChart: any;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Heatmap Charts', active: true }
    ];

    // Chart Color Data Get Function
    this._basicHeatmapChart('["--tb-success", "--tb-card-custom"]');
    this._multipleSeriesChart('["--tb-primary", "--tb-secondary", "--tb-success", "--tb-info", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-primary", "--tb-card-custom"]');
    this._colorRangeChart('["--tb-info", "--tb-success", "--tb-primary", "--tb-warning"]');
    this._rangeWithoutShadesChart('["--tb-info", "--tb-primary"]');
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
  * Series Data
  */
  private generateData(count: number, yrange: { max: number; min: number; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = "w" + (i + 1).toString();
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

      series.push({
        x: x,
        y: y
      });
      i++;
    }
    return series;
  }

  /**
  * Basic Heatmap Chart
  */
  private _basicHeatmapChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.basicHeatmapChart = {
      series: [
        {
          name: "Metric1",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric2",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric3",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric4",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric5",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric6",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric7",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric8",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric9",
          data: this.generateData(18, {
            min: 0,
            max: 90,
          }),
        },
      ],
      chart: {
        height: 450,
        type: "heatmap",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: [colors[0]],
      title: {
        text: "HeatMap Chart (Single color)",
        style: {
          fontWeight: 500,
        },
      },
      stroke: {
        colors: [colors[1]]
      }
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._basicHeatmapChart('["--tb-success", "--tb-card-custom"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Heatmap - Multiple Series
  */
  private _multipleSeriesChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.multipleSeriesChart = {
      series: [
        {
          name: "W1",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W2",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W3",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W4",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W5",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W6",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W7",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W8",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W9",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W10",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W11",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W12",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W13",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W14",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "W15",
          data: this.generateData(8, {
            min: 0,
            max: 90,
          }),
        },
      ],
      chart: {
        height: 450,
        type: "heatmap",
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: [colors[0], colors[1], colors[2], colors[3], colors[4], colors[5], colors[6], colors[7]],
      xaxis: {
        type: "category",
        categories: [
          "10:00",
          "10:30",
          "11:00",
          "11:30",
          "12:00",
          "12:30",
          "01:00",
          "01:30",
        ],
      },
      title: {
        text: "HeatMap Chart (Different color shades for each series)",
        style: {
          fontWeight: 500,
        },
      },
      grid: {
        padding: {
          right: 20,
        },
      },
      stroke: {
        colors: [colors[8]]
      }
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._multipleSeriesChart('["--tb-primary", "--tb-secondary", "--tb-success", "--tb-info", "--tb-warning", "--tb-danger", "--tb-dark", "--tb-primary", "--tb-card-custom"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Heatmap Color Range
  */
  private _colorRangeChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.colorRangeChart = {
      series: [
        {
          name: "Jan",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: "Feb",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: "Mar",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: "Apr",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: "May",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: "Jun",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: "Jul",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: "Aug",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
        {
          name: "Sep",
          data: this.generateData(20, {
            min: -30,
            max: 55,
          }),
        },
      ],
      chart: {
        height: 350,
        type: "heatmap",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        heatmap: {
          shadeIntensity: 0.5,
          radius: 0,
          useFillColorAsStroke: true,
          colorScale: {
            ranges: [
              {
                from: -30,
                to: 5,
                name: "Low",
                color: colors[0],
              },
              {
                from: 6,
                to: 20,
                name: "Medium",
                color: colors[1],
              },
              {
                from: 21,
                to: 45,
                name: "High",
                color: colors[2],
              },
              {
                from: 46,
                to: 55,
                name: "Extreme",
                color: colors[3],
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 1,
      },
      title: {
        text: "HeatMap Chart with Color Range",
        style: {
          fontWeight: 500,
        },
      }
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._colorRangeChart('["--tb-info", "--tb-success", "--tb-primary", "--tb-warning"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Heatmap - Range Without Shades
  */
  private _rangeWithoutShadesChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.rangeWithoutShadesChart = {
      series: [
        {
          name: "Metric1",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric2",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric3",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric4",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric5",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric6",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric7",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric8",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
        {
          name: "Metric8",
          data: this.generateData(20, {
            min: 0,
            max: 90,
          }),
        },
      ],
      chart: {
        height: 350,
        type: "heatmap",
        toolbar: {
          show: false,
        },
      },
      stroke: {
        width: 0,
      },
      plotOptions: {
        heatmap: {
          radius: 30,
          enableShades: false,
          colorScale: {
            ranges: [
              {
                from: 0,
                to: 50,
                color: colors[0],
              },
              {
                from: 51,
                to: 100,
                color: colors[1],
              },
            ],
          },
        },
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ["#fff"],
        },
      },
      xaxis: {
        type: "category",
      },
      title: {
        text: "Rounded (Range without Shades)",
        style: {
          fontWeight: 500,
        },
      },
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._rangeWithoutShadesChart('["--tb-info", "--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

}
