import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { circle, latLng, tileLayer } from 'leaflet';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { shuffleArray } from 'src/app/shared/commonFunction';
import { Store } from '@ngrx/store';
import { selectabledata } from 'src/app/store/CRM/crm-selector';
import { fetchtableData } from 'src/app/store/CRM/crm.actions';
import { fetchStatData } from 'src/app/store/Analytics/analytics.actions';
import { selectData } from 'src/app/store/Analytics/analytics-selector';
import { fetchfeedbackdataData, fetchrentproprtydataData, fetchsalepropertydataData } from 'src/app/store/RealEstate/realEstate.action';
import { selectfeedData, selectrentData, selectsaleData } from 'src/app/store/RealEstate/realEstate-selector';
import { widget, widget2 } from './data';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss'],
  providers: [DecimalPipe]
})
export class WidgetsComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  widgetdata!: any;
  salesReportChart: any;
  statedata: any
  syncStatusBreakdownChart: any;
  realizedChart: any;
  emailSentChart: any;
  browsers: any;
  miniChart6: any;
  miniChart7: any;
  miniChart8: any;
  miniChart9: any;
  currentTab = 'sale';
  widget2data: any
  contactList: any;
  statlist: any
  total: any;
  rentpropertyData: any;
  salepropertyData: any;
  feedbackData: any
  constructor(public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Steex', active: true },
      { label: 'Widgets', active: true }
    ];
    this.statlist = widget
    this.widget2data = widget2
    // store
    this.store.dispatch(fetchtableData());
    this.store.select(selectabledata).subscribe((data) => {
      this.statedata = data;
    });

    this.store.dispatch(fetchStatData());
    this.store.select(selectData).subscribe((data) => {
      this.browsers = data;
    });
    this.store.dispatch(fetchsalepropertydataData());
    this.store.select(selectsaleData).subscribe((data) => {
      this.salepropertyData = data;
    });
    this.store.dispatch(fetchrentproprtydataData());
    this.store.select(selectrentData).subscribe((data) => {
      this.rentpropertyData = data;
    });
    this.store.dispatch(fetchfeedbackdataData());
    this.store.select(selectfeedData).subscribe((data) => {
      this.feedbackData = data;
    });

    // Chart Color Data Get Function
    this._realizedChart('["--tb-primary", "--tb-secondary", "--tb-danger"]');
    this._salesReportChart('["--tb-primary", "--tb-secondary"]');
    this._syncStatusBreakdownChart('["--tb-primary", "--tb-primary-rgb, 0.85", "--tb-primary-rgb, 0.60", "--tb-primary-rgb, 0.50", "--tb-info"]');
    this._emailSentChart('["--tb-primary", "--tb-success", "--tb-secondary"]');
    this._miniChart6('["--tb-secondary"]');
    this._miniChart7('["--tb-primary"]');
    this._miniChart8('["--tb-warning"]');
    this._miniChart9('["--tb-success"]');

    // Set world-map-markers amchart
    let markerRoot = am5.Root.new("Countries");

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

  }



  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
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
* Realized Charts
*/
  changerealizedValue() {
    var readSeries = [80, 50, 30, 40, 100, 20]
    const shuffledvisitorSeries = [...readSeries];
    shuffleArray(shuffledvisitorSeries);

    var deliverySeries = [20, 30, 40, 80, 20, 80]
    const shuffledreturnSeries = [...deliverySeries];
    shuffleArray(shuffledreturnSeries);

    var failedSeries = [44, 76, 78, 13, 43, 10]
    const shuffledfailedSeries = [...failedSeries];
    shuffleArray(shuffledreturnSeries);

    setTimeout(() => {
      this.realizedChart.series = [{
        name: 'Read',
        data: shuffledvisitorSeries
      },
      {
        name: 'Delivery',
        data: shuffledreturnSeries
      },
      {
        name: 'Failed',
        data: shuffledfailedSeries
      }
      ];
    }, 500);
  }


  private _realizedChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.realizedChart = {
      series: [{
        name: 'Read',
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: 'Delivery',
        data: [20, 30, 40, 80, 20, 80],
      },
      {
        name: 'Failed',
        data: [44, 76, 78, 13, 43, 10],
      }
      ],
      chart: {
        height: 370,
        type: 'radar',
        toolbar: {
          show: false
        },
      },
      stroke: {
        width: 1
      },
      fill: {
        opacity: 0.2
      },
      markers: {
        size: 3,
        hover: {
          size: 4,
        }
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return val
          }
        }
      },
      colors: colors,
      xaxis: {
        categories: ['2018', '2019', '2020', '2021', '2022', '2023'],
      }
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._realizedChart('["--tb-primary", "--tb-secondary", "--tb-danger"]');
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
        height: 320,
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
* User Activity Charts
*/
  changeStatuschart() {
    var SyncSeries = [44, 55, 41, 37, 22, 43, 21]
    const shuffledSyncSeries = [...SyncSeries];
    shuffleArray(shuffledSyncSeries);

    var NeededSeries = [53, 32, 33, 52, 13, 43, 32]
    const shuffledNeededSeries = [...NeededSeries];
    shuffleArray(shuffledNeededSeries);

    var NeverSeries = [12, 17, 11, 9, 15, 11, 20]
    const shuffledNeverSeries = [...NeverSeries];
    shuffleArray(shuffledNeverSeries);

    var ReviewSeries = [9, 7, 5, 8, 6, 9, 4]
    const shuffledReviewSeries = [...ReviewSeries];
    shuffleArray(shuffledReviewSeries);

    setTimeout(() => {
      this.syncStatusBreakdownChart.series = [{
        name: 'Synced',
        data: shuffledSyncSeries
      }, {
        name: 'Sync Needed',
        data: shuffledNeededSeries
      }, {
        name: 'Never Synced',
        data: shuffledNeverSeries
      }, {
        name: 'Review Needed',
        data: shuffledReviewSeries
      }]
    }, 500);
  }

  private _syncStatusBreakdownChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.syncStatusBreakdownChart = {
      series: [{
        name: 'Synced',
        data: [44, 55, 41, 37, 22, 43, 21]
      }, {
        name: 'Sync Needed',
        data: [53, 32, 33, 52, 13, 43, 32]
      }, {
        name: 'Never Synced',
        data: [12, 17, 11, 9, 15, 11, 20]
      }, {
        name: 'Review Needed',
        data: [9, 7, 5, 8, 6, 9, 4]
      }],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnHight: '40%',
        },
      },
      grid: {
        show: true,
        padding: {
          top: -20,
          right: 0,
          bottom: -10,
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      },
      yaxis: {
        title: {
          text: undefined
        },
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: false,
      },
      colors: colors,
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._syncStatusBreakdownChart('["--tb-primary", "--tb-primary-rgb, 0.85", "--tb-primary-rgb, 0.60", "--tb-primary-rgb, 0.50", "--tb-info"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }


  /**
* Email sent Charts
*/
  changeEmailchart() {
    var emailSeries = [63, 87, 33]
    const shuffledemailSeries = [...emailSeries];
    shuffleArray(shuffledemailSeries);

    setTimeout(() => {
      this.emailSentChart.series = shuffledemailSeries
    }, 500);
  }

  private _emailSentChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.emailSentChart = {
      series: [63, 87, 33],
      chart: {
        height: 396,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          track: {
            background: colors,
            opacity: 0.15,
          },
          dataLabels: {
            name: {
              fontSize: '22px',
            },
            value: {
              fontSize: '16px',
              color: "#87888a",
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w: any) {
                return 1793
              }
            }
          },
        }
      },
      legend: {
        show: true,
        position: 'bottom',
      },
      labels: ['Sent', 'Received', 'Failed'],
      colors: colors,
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._emailSentChart('["--tb-primary", "--tb-success", "--tb-secondary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }
  // Add Sorting
  direction: any = 'asc';
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

  // mini Chart 6
  private _miniChart6(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.miniChart6 = {
      series: [{
        data: [50, 15, 35, 62, 23, 56, 44, 12]
      }],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true
        }

      },
      colors: colors,
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._miniChart6('["--tb-secondary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  // mini Chart 7
  private _miniChart7(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.miniChart7 = {
      series: [{
        data: [50, 15, 20, 34, 23, 56, 65, 75]
      }],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true
        }

      },
      colors: colors,
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._miniChart7('["--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  // mini Chart 8
  private _miniChart8(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.miniChart8 = {
      series: [{
        data: [32, 18, 29, 31, 46, 33, 39, 46]
      }],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true
        }

      },
      colors: colors,
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._miniChart8('["--tb-warning"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  // mini Chart 9
  private _miniChart9(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.miniChart9 = {
      series: [{
        data: [36, 25, 18, 34, 39, 30, 34, 42]
      }],
      chart: {
        type: 'line',
        height: 50,
        sparkline: {
          enabled: true
        }

      },
      colors: colors,
      stroke: {
        curve: 'smooth',
        width: 1,
      },
      tooltip: {
        fixed: {
          enabled: false
        },
        x: {
          show: false
        },
        y: {
          title: {
            formatter: function (seriesName: any) {
              return ''
            }
          }
        },
        marker: {
          show: false
        }
      }
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._miniChart9('["--tb-success"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }


  /**
  * Sale Location Map
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

}