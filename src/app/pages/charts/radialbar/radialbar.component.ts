import { Component } from '@angular/core';

@Component({
  selector: 'app-radialbar',
  templateUrl: './radialbar.component.html',
  styleUrls: ['./radialbar.component.scss']
})
export class RadialbarComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  basicRadialbarChart: any;
  multipleRadialbarChart: any;
  customAngleChart: any;
  gradientCircleChart: any;
  strokedCircleChart: any;
  radialbarsChart: any;

  semiCircleChart: any;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Apexcharts' },
      { label: 'Radialbar Charts', active: true }
    ];

    // Chart Color Data Get Function
    this._basicRadialbarChart('["--tb-success"]');
    this._multipleRadialbarChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger"]');
    this._customAngleChart('["--tb-primary", "--tb-info", "--tb-danger", "--tb-success"]');
    this._gradientCircleChart('["--tb-success"]');
    this._strokedCircleChart('["--tb-success"]');
    this._radialbarsChart('["--tb-success"]');
    this._semiCircleChart('["--tb-primary"]');
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
  * Basic Radialbar Chart
  */
  private _basicRadialbarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.basicRadialbarChart = {
      series: [70],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
        },
      },
      labels: ["Cricket"],
      colors: colors,
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._basicRadialbarChart('["--tb-success"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Multiple Radialbar
  */
  private _multipleRadialbarChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.multipleRadialbarChart = {
      series: [44, 55, 67, 83],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px",
            },
            value: {
              fontSize: "16px",
            },
            total: {
              show: true,
              label: "Total",
              formatter: function (w: any) {
                return 249
              }
            },
          },
        },
      },
      labels: ["Apples", "Oranges", "Bananas", "Berries"],
      colors: colors,
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
     this._multipleRadialbarChart('["--tb-primary", "--tb-success", "--tb-warning", "--tb-danger"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Circle Chart - Custom Angle
  */
  private _customAngleChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.customAngleChart = {
      series: [76, 67, 61, 55],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            },
          },
        },
      },
      colors: colors,
      labels: ["Vimeo", "Messenger", "Facebook", "LinkedIn"],
      legend: {
        show: true,
        floating: true,
        fontSize: "16px",
        position: "left",
        offsetX: 160,
        offsetY: 15,
        labels: {
          useSeriesColors: true,
        },
        markers: {

        },
        formatter: function (seriesName: any, opts: any) {
          return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex];
        },
        itemMargin: {
          vertical: 3,
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },],
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
     this._customAngleChart('["--tb-primary", "--tb-info", "--tb-danger", "--tb-success"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Gradient Circle Chart
  */
  private _gradientCircleChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.gradientCircleChart = {
      series: [75],
      chart: {
        height: 350,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 225,
          hollow: {
            margin: 0,
            size: "70%",
            image: undefined,
            imageOffsetX: 0,
            imageOffsetY: 0,
            position: "front",
          },
          track: {
            strokeWidth: "67%",
            margin: 0, // margin is in pixels
          },

          dataLabels: {
            show: true,
            name: {
              offsetY: -10,
              show: true,
              color: "#888",
              fontSize: "17px",
            },
            value: {
              formatter: function (val: any) {
                return parseInt(val);
              },
              color: "#111",
              fontSize: "36px",
              show: true,
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: colors,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100],
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Percent"],
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
     this._gradientCircleChart('["--tb-success"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Stroked Circular Gauge
  */
  private _strokedCircleChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.strokedCircleChart = {
      series: [67],
      chart: {
        height: 326,
        type: "radialBar",
        offsetY: -10,
      },
      plotOptions: {
        radialBar: {
          startAngle: -135,
          endAngle: 135,
          dataLabels: {
            name: {
              fontSize: "16px",
              color: undefined,
              offsetY: 120,
            },
            value: {
              offsetY: 76,
              fontSize: "22px",
              color: undefined,
              formatter: function (val: any) {
                return val + "%";
              },
            },
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          shadeIntensity: 0.15,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 65, 91],
        },
      },
      stroke: {
        dashArray: 4,
      },
      labels: ["Median Ratio"],
      colors: colors,
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
     this._strokedCircleChart('["--tb-success"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Semi Circular Gauge
  */
  private _semiCircleChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.semiCircleChart = {
      series: [76],
      chart: {
        type: "radialBar",
        height: 350,
        offsetY: -20,
        sparkline: {
          enabled: true,
        },
      },
      plotOptions: {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          track: {
            background: "#e7e7e7",
            strokeWidth: "97%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              color: "#999",
              opacity: 1,
              blur: 2,
            },
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              offsetY: -2,
              fontSize: "22px",
            },
          },
        },
      },
      grid: {
        padding: {
          top: -10,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          shadeIntensity: 0.4,
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 53, 91],
        },
      },
      labels: ["Average Results"],
      colors: colors,
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
     this._semiCircleChart('["--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
  * Stroked Circular Gauge
  */
  private _radialbarsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.radialbarsChart = {
      series: [67],
      chart: {
        height: 315,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: '65%',
            image: './assets/images/comingsoon.png',
            imageWidth: 56,
            imageHeight: 56,
            imageClipped: false
          },
          dataLabels: {
            name: {
              show: false,
              color: '#fff'
            },
            value: {
              show: true,
              color: '#333',
              offsetY: 65,
              fontSize: '22px'
            }
          }
        }
      },
      fill: {
        type: 'image',
        image: {
          src: ['./assets/images/small/img-4.jpg'],
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Volatility'],
    };

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
     this._radialbarsChart('["--tb-success"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
   
  }
}
