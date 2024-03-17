import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { circle, latLng, tileLayer } from 'leaflet';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { ModalDirective } from 'ngx-bootstrap/modal';

// amCharts imports
import * as am5 from '@amcharts/amcharts5';
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import { shuffleArray } from 'src/app/shared/commonFunction';
import { Store } from '@ngrx/store';
import { fetchorderData,  fetchsalesData } from 'src/app/store/Ecommerce/ecommerce.actions';
import { selectData, selectorderata, selectproductData } from 'src/app/store/Ecommerce/ecommerce-selector';
import { products } from './data';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  providers: [DecimalPipe]
})
export class IndexComponent {

  marketverviewChart: any;
  columnChart: any;
  mini6Chart: any;
  mini7Chart: any;
  salesList: any;
  orderList: any;
  produtlist: any;

  @ViewChild('productModal', { static: false }) productModal?: ModalDirective;
  productdetail: any;
  sortValue: any = 'Order Date';

  constructor(public store: Store) { }

  ngOnInit(): void {
    this._marketverviewChart('["--tb-primary", "--tb-secondary"]');
    this._columnChart('["--tb-primary", "--tb-light"]');
    this._mini6Chart('["--tb-primary"]');
    this._mini7Chart('["--tb-info"]');

    this.produtlist = products

    // Recent Sales
    this.store.dispatch(fetchsalesData());
    this.store.select(selectData).subscribe((data) => {
      this.salesList = data;
    });
    // Latest Orders
    this.store.dispatch(fetchorderData());
    this.store.select(selectorderata).subscribe((data) => {
      this.orderList = data;
    });

    // Set world-map-markers amchart
    setTimeout(() => {
      let markerRoot = am5.Root.new("chartsdiv");

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
    }, 1000);


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
*Market Overview Charts
*/

  changeRevenue() {
    var EarningSeries = [26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65, 27.32, 25, 24.65, 29.32]
    const shuffledEarningSeries = [...EarningSeries];
    shuffleArray(shuffledEarningSeries);

    var ExpenseSeries = [-10, -17.32, -15.45, -12.30, -19.15, -15.45, -11, -14.32, -15.67, -10, -17.32, -19.2]
    const shuffledExpenseSeries = [...ExpenseSeries];
    shuffleArray(shuffledExpenseSeries);

    setTimeout(() => {
      this.marketverviewChart.series = [{
        name: 'Earning',
        data: shuffledEarningSeries
      },
      {
        name: 'Expense',
        data: shuffledExpenseSeries
      }]
    }, 500);
  }

  private _marketverviewChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.marketverviewChart = {
      series: [{
        name: 'Earning',
        data: [26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65, 27.32, 25, 24.65, 29.32]
      },
      {
        name: 'Expense',
        data: [-10, -17.32, -15.45, -12.30, -19.15, -15.45, -11, -14.32, -15.67, -10, -17.32, -19.2]
      }
      ],
      chart: {
        type: 'bar',
        height: 328,
        stacked: true,
        toolbar: {
          show: false
        },
      },
      stroke: {
        width: 5,
        colors: "#000",
        lineCap: 'round',
      },
      grid: {
        show: true,
        borderColor: '#000',

        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: false
          }
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
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
      yaxis: {
        labels: {
          show: true,
          formatter: function (y: any) {
            return y.toFixed(0) + "k";
          }
        },
      },
      legend: {
        show: false,
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
      }
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._marketverviewChart('["--tb-primary", "--tb-secondary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* Column Charts
*/
  private _mini6Chart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.mini6Chart = {
      series: [{
        data: [50, 15, 35, 62, 23, 56, 44, 12]
      }],
      chart: {
        type: 'line',
        height: 45,
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
      this._mini6Chart('["--tb-primary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* Column Charts
*/
  private _mini7Chart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.mini7Chart = {
      series: [{
        data: [50, 15, 20, 34, 23, 56, 65, 41]
      }],
      chart: {
        type: 'line',
        height: 45,
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
      this._mini7Chart('["--tb-info"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  /**
* Column Charts
*/
  changeTraffic() {
    var EngineSeries = [74, 83, 102, 97]
    const shuffledEngineSeries = [...EngineSeries];
    shuffleArray(shuffledEngineSeries);

    var DirectSeries = [46, 57, 59, 54]
    const shuffledDirectSeries = [...DirectSeries];
    shuffleArray(shuffledDirectSeries);

    setTimeout(() => {
      this.columnChart.series = [{
        name: 'Search Engine Traffic',
        data: shuffledEngineSeries
      }, {
        name: 'Direct Traffic',
        data: shuffledDirectSeries
      }]
    }, 500);
  }

  private _columnChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.columnChart = {
      chart: {
        height: 360,
        type: 'bar',
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '45%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 1,
        colors: ['transparent']
      },
      legend: {
        show: true,
        position: 'top',
      },
      series: [{
        name: 'Search Engine Traffic',
        data: [74, 83, 102, 97]
      }, {
        name: 'Direct Traffic',
        data: [46, 57, 59, 54]
      }],
      colors: colors,
      xaxis: {
        categories: ['Feb', 'Mar', 'Apr', 'May'],
      },
      yaxis: {
        show: false,
      },
      grid: {
        borderColor: '#f1f1f1',
      },
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._columnChart('["--tb-primary", "--tb-light"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  // Add Sorting
  direction: any = 'asc';
  sortKey: any = ''
  sortBy(column: any, value: any) {
    this.sortValue = value;
    this.onSort(column)
  }

  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.orderList]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.orderList = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
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

  // Product Model
  showproductModal(id: any) {
    this.productdetail = this.produtlist[id]
    this.productModal?.show()
  }
}