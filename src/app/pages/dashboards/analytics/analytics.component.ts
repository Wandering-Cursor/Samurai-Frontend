import { Component } from '@angular/core';

import { circle, latLng, tileLayer } from 'leaflet';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
// store
import { Store } from '@ngrx/store';
import { fetchStatData, fetchtopPageData } from 'src/app/store/Analytics/analytics.actions';
import { selectData, selecttopData } from 'src/app/store/Analytics/analytics-selector';
import { statData } from './data';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})

// Analytics Component
export class AnalyticsComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statlist: any;
  browsers: any;
  pagesData: any

  pageoverviewChart: any;
  clicksChart: any;
  columnChart: any;
  salesReportChart: any;
  timeChart: any;
  goalChart: any;
  bounceChart: any;
  newSessionsChart: any;
  mainChart: any;
  currentTab = 'pageViews';

  num: number = 0;

  sortValue: any = 'Order Date';

  constructor(public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboards',active: true },
      { label: 'Analytics', active: true }
    ];

    this.statlist = statData
    // store
    this.store.dispatch(fetchStatData());
    this.store.select(selectData).subscribe((data) => {
      this.browsers = data;
    });
    this.store.dispatch(fetchtopPageData());
    this.store.select(selecttopData).subscribe((data) => {
      this.pagesData = data;
    });

    // Chart Color Data Get Function
    this._pageoverviewChart('["--tb-light", "--tb-primary", "--tb-secondary"]');
    this._clicksChart('["--tb-light", "--tb-secondary", "--tb-primary"]');
    this._columnChart('["--tb-primary-text-emphasis"]');
    this._salesReportChart('["--tb-primary", "--tb-secondary"]');
    this._timeChart('["--tb-primary"]');
    this._goalChart('["--tb-dark"]');
    this._bounceChart('["--tb-danger"]');
    this._newSessionsChart('["--tb-info"]');
    this._mainChart('["--tb-primary-bg-subtle", "--tb-light", "--tb-primary"]');

    // Set world-map-markers amchart
    setTimeout(() => {
      let markerRoot = am5.Root.new("chartdiv");

      markerRoot.setThemes([am5themes_Animated.new(markerRoot)]);


      let markerChart = markerRoot.container.children.push(
        am5map.MapChart.new(markerRoot, {
          panX: "none",
          panY: "none",
          opacity: 1,
          projection: am5map.geoMercator(),
        })
      );

      markerChart.series.push(
        am5map.MapPolygonSeries.new(markerRoot, {
          geoJSON: am5geodata_worldLow,
          exclude: ["AQ"],
          fill: am5.color("rgb(222, 226, 232)"),
          stroke: am5.color("#fff"),
        })
      );

      // Create point series
      var pointSeries = markerChart.series.push(
        am5map.MapPointSeries.new(markerRoot, {})
      );

      pointSeries.bullets.push(function (_root, _series, dataItem: any) {
        return am5.Bullet.new(markerRoot, {
          sprite: am5.Circle.new(markerRoot, {
            radius: 6,
            stroke: am5.color("#fff"),
            strokeWidth: 5,
            strokeOpacity: 0.5,
            fill: am5.color(0x000),
            fillOpacity: 1,
            cursorOverStyle: 'pointer',
          }),
        });
      });

      pointSeries.pushDataItem({ latitude: 31.9474, longitude: 35.2272 });
      pointSeries.pushDataItem({ latitude: 61.524, longitude: 105.3188 });
      pointSeries.pushDataItem({ latitude: 56.1304, longitude: -106.3468 });
      pointSeries.pushDataItem({ latitude: 71.7069, longitude: -42.6043 });
    }, 0);

     // Iterate through your statData array
     for (const dataItem of this.statlist) {
      // Check if the count value is a decimal
      if (dataItem.count.includes('.')) {
        dataItem.option = {
          startVal: this.num,
          useEasing: true,
          duration: 2,
          decimalPlaces: 2, // Set decimalPlaces for decimal values
        };
      } else {
        dataItem.option = {
          startVal: this.num,
          useEasing: true,
          duration: 2,
          // Don't set decimalPlaces for integer values
        };
      }
    }

  }

  // Change Tab Content
  changeTab(tab: string, charts: any) {
    this.currentTab = tab;

    if (charts === '1') {
      this._pageoverviewChart('["--tb-light", "--tb-primary", "--tb-secondary"]');
    } else if (charts === '2') {
      this._clicksChart('["--tb-light", "--tb-secondary", "--tb-primary"]');
    } else {
      this._columnChart('["--tb-primary-text-emphasis"]');
    }
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
* Page Overview Charts
*/
  private _pageoverviewChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.pageoverviewChart = {
      series: [{
        name: 'Website',
        data: [12, 14.65, 28.24, 25.02, 19.65, 23, 21.18, 23.65, 20.32, 18, 12.65, 28.32]
      },
      {
        name: 'Social Media',
        data: [26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65, 27.32, 25, 24.65, 29.32]
      },
      {
        name: 'Others',
        data: [-10, -17.32, -15.45, -12.30, -19.15, -15.45, -11, -14.32, -15.67, -10, -17.32, -19.2]
      }
      ],
      chart: {
        type: 'bar',
        height: 373,
        stacked: true,
        toolbar: {
          show: false
        }
      },
      stroke: {
        width: 5,
        colors: "#000",
        lineCap: 'round',
      },
      plotOptions: {
        bar: {
          columnWidth: '25%',
          borderRadius: 5,
          lineCap: 'round',
          borderRadiusOnAllStackedSeries: true

        },
      },
      colors: colors,
      fill: {
        opacity: 1
      },
      dataLabels: {
        enabled: false,
        textAnchor: 'top',
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        labels: {
          rotate: -90
        },
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          stroke: {
            width: 1
          },
        },
      },
      responsive: [
        {
          breakpoint: 992,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '50px',
              }
            },
          }
        },
        {
          breakpoint: 600,
          options: {
            plotOptions: {
              bar: {
                columnWidth: '70px',
              }
            },
          }
        }
      ]
    }
    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._pageoverviewChart('["--tb-light", "--tb-primary", "--tb-secondary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });

  }

  /**
* Clicks Charts
*/
  private _clicksChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.clicksChart = {
      series: [{
        name: 'Website',
        data: [21, 10, 12, 8, 18, 29, 16, 20, 36, 22, 29, 16]
      }, {
        name: 'Ads Clicks',
        data: [10, 29, 16, 13, 33, 24, 39, 46, 40, 35, 49, 41]
      }, {
        name: 'Social Media',
        data: [26, 17, 34, 15, 21, 14, 8, 33, 26, 45, 32, 57]
      }],
      chart: {
        type: 'line',
        height: 373,
        toolbar: {
          show: true
        },
        zoom: {
          enabled: true
        },
      },
      stroke: {
        width: 3,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }],
      xaxis: {
        type: 'datetime',
        categories: ['01/01/2023 GMT', '01/02/2023 GMT', '01/03/2023 GMT', '01/04/2023 GMT',
          '01/05/2023 GMT', '01/06/2023 GMT', '01/07/2023 GMT', '01/08/2023 GMT', '01/09/2023 GMT', '01/10/2023 GMT', '01/11/2023 GMT', '01/12/2023 GMT'
        ],
      },
      legend: {
        position: 'top',
      },
      fill: {
        opacity: 1
      },
      colors: colors,
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._clicksChart('["--tb-light", "--tb-secondary", "--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* Column Charts
*/
  private _columnChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.columnChart = {
      series: [{
        data: [30, 57, 25, 33, 20, 39, 47, 36, 22, 51, 38, 27, 38, 49, 42, 58, 33, 46, 40, 34, 41, 53, 19, 23, 36, 52, 58, 43]
      }],
      chart: {
        height: 373,
        type: 'bar',
        toolbar: {
          show: false,
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '45%',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      legend: {
        show: false
      },
      xaxis: {
        type: 'datetime',
        categories: ['01/01/2023 GMT', '01/02/2023 GMT', '01/03/2023 GMT', '01/04/2023 GMT',
          '01/05/2023 GMT', '01/06/2023 GMT', '01/07/2023 GMT', '01/08/2023 GMT', '01/09/2023 GMT', '01/10/2023 GMT', '01/11/2023 GMT', '01/12/2023 GMT', '01/13/2023 GMT',
          '01/14/2023 GMT', '01/15/2023 GMT', '01/16/2023 GMT', '01/17/2023 GMT', '01/18/2023 GMT', '01/19/2023 GMT', '01/20/2023 GMT', '01/21/2023 GMT', '01/22/2023 GMT',
          '01/23/2023 GMT', '01/24/2023 GMT', '01/25/2023 GMT', '01/26/2023 GMT', '01/27/2023 GMT', '01/28/2023 GMT'
        ],
      },
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._columnChart('["--tb-primary-text-emphasis"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* Time on Sale Charts
*/
  private _timeChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.timeChart = {
      series: [70],
      chart: {
        width: 50,
        height: 100,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '45%',
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true, fontSize: '10px', offsetY: 5,
            },
          }
        },
      },
      colors: colors
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._timeChart('["--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* Goal Completions Charts
*/
  private _goalChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.goalChart = {
      series: [74.52],
      chart: {
        width: 50,
        height: 100,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '45%',
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true, fontSize: '10px', offsetY: 5,
            },
          }
        },
      },
      colors: colors
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._goalChart('["--tb-dark"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* Bounce Rate Charts
*/
  private _bounceChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.bounceChart = {
      series: [81.32],
      chart: {
        width: 50,
        height: 100,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '45%',
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true, fontSize: '10px', offsetY: 5,
            },
          }
        },
      },
      colors: colors
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._bounceChart('["--tb-danger"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* New Sessions Charts
*/
  private _newSessionsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.newSessionsChart = {
      series: [94.03],
      chart: {
        width: 50,
        height: 100,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '45%',
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: true, fontSize: '10px', offsetY: 5,
            },
          }
        },
      },
      colors: colors
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._newSessionsChart('["--tb-info"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }


  /**
* Sale Report Charts
*/
  private _salesReportChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.salesReportChart = {
      series: [{
        name: 'This Month',
        data: [45, 74, 36, 69, 84, 110, 92]
      }, {
        name: 'Last Month',
        data: [11, 18, 20, 32, 46, 65, 73]
      }],
      chart: {
        height: 333,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      grid: {
        padding: {
          top: 0,
          right: 2,
          bottom: 0,
        },
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
        offsetY: "-50px",
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.4,
          opacityTo: 0,
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'stepline',
      },
      colors: colors,
      xaxis: {
        type: 'datetime',
        categories: ["02/01/2023 GMT", "02/02/2023 GMT", "02/03/2023 GMT", "02/04/2023 GMT", "02/05/2023 GMT", "02/06/2023 GMT", "02/07/2023 GMT"]
      },
      yaxis: {
        labels: {
          show: true,
          formatter: function (y: any) {
            return y.toFixed(0) + "k";
          }
        },
      },
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._salesReportChart('["--tb-primary", "--tb-secondary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* Main Country Charts
*/

  private _mainChart(colors: any) {
    const data = [];
    for (let i = 0; i < 5; ++i) {
      data.push(Math.round(Math.random() * 200));
    }
    colors = this.getChartColorsArray(colors);
    this.mainChart = {
      grid: {
        left: '0%',
        right: '6%',
        bottom: '0%',
        top: '4%',
        containLabel: true
      },
      xAxis: {
        max: 'dataMax',

        splitLine: {
          lineStyle: {
            color: "rgba(135,136, 138,.1)"
          }
        },
      },

      yAxis: {
        type: 'category',
        data: ['Canada', 'US', 'Serbia', 'Russia', 'Brazil'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
      },
      series: [
        {
          realtimeSort: true,
          type: 'bar',
          data: data,
          label: {
            color: "#87888a",
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: false
      },
      color: colors,
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._mainChart('["--tb-primary-bg-subtle", "--tb-light", "--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  chart: any;
  // Render All chart when Change Tab
  renderCharts(charts: any) {
    if (charts === '1') {
      this._pageoverviewChart('["--tb-light", "--tb-primary", "--tb-secondary"]');
    } else if (charts === '2') {
      this._clicksChart('["--tb-light", "--tb-secondary", "--tb-primary"]');
    } else {
      this._columnChart('["--tb-primary-text-emphasis"]');
    }
  }



  /**
* Active Users Right Now
*/
  choropleth = {
    layers: [
      tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w", {
        id: "mapbox/light-v9",
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      })
    ],
    zoom: 1.1,
    center: latLng(28, 1.5)
  };
  choroplethLayers = [
    circle([41.9, 12.45], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([12.05, -61.75], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
    circle([1.3, 103.8], { color: "#435fe3", opacity: 0.5, weight: 10, fillColor: "#435fe3", fillOpacity: 1, radius: 400000, }),
  ];


  // Sort Data
  direction: any = 'asc';
  sortBy(column: any, value: any) {
    this.sortValue = value;
    this.onSort(column)
  }

  sortKey: any = ''
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.browsers]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.browsers = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  topSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.pagesData]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.pagesData = sortedArray;
  }

  sortArray(array: any[], column: string): any[] {
    return array.sort((a, b) => {
      if (column === 'activepage') {
        return this.compare(a.activepage, b.activepage);
      } else if (column === 'active') {
        return this.compare(a.active, b.active);
      } else if (column === 'users') {
        return this.compare(a.users, b.users);
      } else if (column === 'browsers') {
        return this.compare(a.browsers, b.browsers);
      } else if (column === 'click') {
        return this.compare(a.click, b.click);
      } else if (column === 'rate') {
        return this.compare(a.rate, b.rate);
      } else {
        return 0; // Handle the case where the column is not recognized
      }
    });
  }


}
