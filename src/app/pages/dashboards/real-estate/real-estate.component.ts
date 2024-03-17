import { Component } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import * as ApexCharts from 'apexcharts';
import { Store } from '@ngrx/store';
import { fetchfeedbackdataData, fetchpropertydataData, fetchrentproprtydataData, fetchsalepropertydataData } from 'src/app/store/RealEstate/realEstate.action';
import { selectData, selectfeedData, selectrentData, selectsaleData } from 'src/app/store/RealEstate/realEstate-selector';

@Component({
  selector: 'app-real-estate',
  templateUrl: './real-estate.component.html',
  styleUrls: ['./real-estate.component.scss'],
  providers: [DecimalPipe]
})

export class RealEstateComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  saleChart: any;
  rentChart: any;
  visitorsChart: any;
  residencypropertyChart: any;
  propertytypeChart: any;
  totalrevenueChart: any;
  totalincomeChart: any;
  propertysaleChart: any;
  propetryrentChart: any;
  miniChart6: any;
  miniChart7: any;
  miniChart8: any;
  miniChart9: any;

  propertylist: any;
  feedbackData: any;
  salepropertyData: any;
  rentpropertyData: any;
  currentDate: any;
  currentTab = 'sale';


  sortValue: any = 'Property Name'


  constructor(public store: Store) {
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.currentDate = { from: firstDay, to: lastDay }
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'Real Estate', active: true }
    ];

    // Chart Color Data Get Function
    this._saleChart('["--tb-primary"]');
    this._rentChart('["--tb-warning"]');
    this._visitorsChart('["--tb-secondary"]');
    this._residencypropertyChart('["--tb-success"]');
    this._propertytypeChart('["--tb-primary", "--tb-secondary", "--tb-light","--tb-danger", "--tb-success"]');
    this._totalrevenueChart('["--tb-primary"]');
    this._totalincomeChart('["--tb-success"]');
    this._propertysaleChart('["--tb-danger"]');
    this._propetryrentChart('["--tb-info"]');
    this._miniChart6('["--tb-secondary"]');
    this._miniChart7('["--tb-primary"]');
    this._miniChart8('["--tb-warning"]');
    this._miniChart9('["--tb-success"]');

    // store data
    this.store.dispatch(fetchpropertydataData());
    this.store.select(selectData).subscribe((data) => {
      this.propertylist = data;
    });
    this.store.dispatch(fetchfeedbackdataData());
    this.store.select(selectfeedData).subscribe((data) => {
      this.feedbackData = data;
    });
    this.store.dispatch(fetchsalepropertydataData());
    this.store.select(selectsaleData).subscribe((data) => {
      this.salepropertyData = data;
    });
    this.store.dispatch(fetchrentproprtydataData());
    this.store.select(selectrentData).subscribe((data) => {
      this.rentpropertyData = data;
    });

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
  * Sale Charts
  */
  private _saleChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.saleChart = {
      series: [80],
      chart: {
        width: 110,
        height: 110,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%',
          },
          track: {
            margin: 0,
            background: colors,
            opacity: 0.2,
          },
          dataLabels: {
            show: false
          }
        }
      },
      grid: {
        padding: {
          top: -15,
          bottom: -15
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Cricket'],
      colors: colors
    }
    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this.reloadCharts();

    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  reloadCharts() {
    this._saleChart('["--tb-primary"]');
    this._rentChart('["--tb-warning"]');
    this._visitorsChart('["--tb-secondary"]');
    this._residencypropertyChart('["--tb-success"]');
    this._propertytypeChart('["--tb-primary", "--tb-secondary", "--tb-light","--tb-danger", "--tb-success"]');
    this._totalrevenueChart('["--tb-primary"]');
    this._totalincomeChart('["--tb-success"]');
    this._propertysaleChart('["--tb-danger"]');
    this._propetryrentChart('["--tb-info"]');
    this._miniChart6('["--tb-secondary"]');
    this._miniChart7('["--tb-primary"]');
    this._miniChart8('["--tb-warning"]');
    this._miniChart9('["--tb-success"]');
  }

  /**
  * Rent Charts
  */
  private _rentChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.rentChart = {
      series: [65],
      chart: {
        width: 110,
        height: 110,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%'
          },
          track: {
            margin: 0,
            background: colors,
            opacity: 0.2,
          },
          dataLabels: {
            show: false
          }
        }
      },
      grid: {
        padding: {
          top: -15,
          bottom: -15
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Cricket'],
      colors: colors
    }
    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._rentChart('["--tb-warning"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
  * visitors Charts
  */
  private _visitorsChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.visitorsChart = {
      series: [47],
      chart: {
        width: 110,
        height: 110,
        type: 'radialBar',
        sparkline: {
          enabled: true
        }
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%'
          },
          track: {
            margin: 0,
            background: colors,
            opacity: 0.2,
          },
          dataLabels: {
            show: false
          }
        }
      },
      grid: {
        padding: {
          top: -15,
          bottom: -15
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Cricket'],
      colors: colors
    }
    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._visitorsChart('["--tb-secondary"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
  * Residency Property Charts
  */
  private _residencypropertyChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.residencypropertyChart = {
      series: [43],
      chart: {
        width: 110,
        height: 110,
        type: 'radialBar',
        sparkline: {
          enabled: true
        },
        redrawOnParentResize: true
      },
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: '50%'
          },
          track: {
            margin: 0,
            background: colors,
            opacity: 0.2,
          },
          dataLabels: {
            show: false
          }
        }
      },
      grid: {
        padding: {
          top: -15,
          bottom: -15
        }
      },
      stroke: {
        lineCap: 'round'
      },
      labels: ['Cricket'],
      colors: colors
    }
    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._residencypropertyChart('["--tb-success"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
  * Property Type Charts
  */
  private _propertytypeChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.propertytypeChart = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: '0%',
        left: 'center',
        // doesn't perfectly work with our tricks, disable it
        selectedMode: false,
        textStyle: {
          color: "#87888a"
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['70%', '100%'],
          center: ['50%', '70%'],
          // adjust the start angle
          startAngle: 180,
          label: {
            color: "#87888a",
            formatter(param: any) {
              // correct the percentage
              return param.name + ' (' + param.percent * 2 + '%)';
            }
          },
          itemStyle: {
            // borderColor: 'transparent',
            borderWidth: 4
          },
          data: [
            { value: 1048, name: 'Residency' },
            { value: 735, name: 'Commercial' },
            { value: 580, name: 'Villa' },
            { value: 484, name: 'Apartment' },
            {
              // make an record to fill the bottom 50%
              value: 1048 + 735 + 580 + 484,
              itemStyle: {
                // stop the chart from rendering this piece
                color: 'none',
                decal: {
                  symbol: 'none'
                }
              },
              label: {
                show: false
              }
            }
          ]
        }
      ],
      color: colors
    }

    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._propertytypeChart('["--tb-primary", "--tb-secondary", "--tb-light","--tb-danger", "--tb-success"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
  * Total Revenue Charts
  */
  private _totalrevenueChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.totalrevenueChart = {
      series: [{
        name: 'Income',
        data: [26, 24.65, 18.24, 29.02, 23.65, 27, 21.18, 24.65, 27.32, 25, 24.65, 29.32]
      }],
      chart: {
        type: 'bar',
        height: 328,
        stacked: true,
        toolbar: {
          show: false
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          lineCap: 'round',
          borderRadiusOnAllStackedSeries: true
        },
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: -15,
          bottom: -15
        }
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
    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._totalrevenueChart('["--tb-primary"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
  * Total Income Charts
  */
  private _totalincomeChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.totalincomeChart = {
      series: [{
        name: "Income",
        data: [32, 18, 13, 17, 26, 34, 47, 51, 59, 63, 44, 38, 53, 69, 72, 83, 90, 110, 130, 117, 103, 92, 95, 119, 80, 96, 116, 125]
      }],
      chart: {
        height: 328,
        type: 'line',
        toolbar: {
          show: false
        },
      },
      grid: {
        yaxis: {
          lines: {
            show: false
          }
        },
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 4
        }
      },
      stroke: {
        curve: 'smooth',
        width: 2
      },
      colors: colors,
      xaxis: {
        type: 'datetime',
        categories: ['02/01/2023 GMT', '02/02/2023 GMT', '02/03/2023 GMT', '02/04/2023 GMT',
          '02/05/2023 GMT', '02/06/2023 GMT', '02/07/2023 GMT', '02/08/2023 GMT', '02/09/2023 GMT', '02/10/2023 GMT', '02/11/2023 GMT', '02/12/2023 GMT', '02/13/2023 GMT',
          '02/14/2023 GMT', '02/15/2023 GMT', '02/16/2023 GMT', '02/17/2023 GMT', '02/18/2023 GMT', '02/19/2023 GMT', '02/20/2023 GMT', '02/21/2023 GMT', '02/22/2023 GMT',
          '02/23/2023 GMT', '02/24/2023 GMT', '02/25/2023 GMT', '02/26/2023 GMT', '02/27/2023 GMT', '02/28/2023 GMT'
        ]
      },
      yaxis: {
        labels: {
          show: true,
          formatter: function (y: any) {
            return "$" + y.toFixed(0);
          }
        },
      }
    }

    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._totalincomeChart('["--tb-success"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
* Property Type Charts
*/
  private _propertysaleChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.propertysaleChart = {
      series: [{
        name: "Property Rent",
        data: [30, 57, 25, 33, 20, 27, 38, 49, 42, 58, 33, 46, 40, 34, 41, 53, 19, 23, 36, 52, 58, 43]
      }],
      chart: {
        height: 328,
        type: 'bar',
        toolbar: {
          show: false,
        }
      },
      colors: colors,
      plotOptions: {
        bar: {
          columnWidth: '30%',
          distributed: true,
          borderRadius: 5,
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
          '01/14/2023 GMT', '01/15/2023 GMT', '01/16/2023 GMT', '01/17/2023 GMT', '01/18/2023 GMT', '01/19/2023 GMT', '01/20/2023 GMT', '01/21/2023 GMT', '01/22/2023 GMT'
        ],
      }
    }

    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._propertysaleChart('["--tb-danger"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }

  /**
* Property Type Charts
*/
  private _propetryrentChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.propetryrentChart = {
      series: [{
        name: 'Property Rent',
        data: [31, 40, 28, 43, 59, 87, 75, 60, 51, 66, 109, 100]
      }],
      chart: {
        height: 328,
        type: 'area',
        toolbar: {
          show: false
        }
      },
      fill: {
        opacity: "0.01",
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 2,
        curve: 'smooth'
      },
      colors: colors,
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

    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._propetryrentChart('["--tb-info"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
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

    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._miniChart6('["--tb-secondary"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
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

    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._miniChart7('["--tb-primary"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
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

    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._miniChart8('["--tb-warning"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
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

    // const attributeToMonitor = 'data-theme';

    // const observer = new MutationObserver(() => {
    //   this._miniChart9('["--tb-success"]');
    // });
    // observer.observe(document.documentElement, {
    //   attributes: true,
    //   attributeFilter: [attributeToMonitor]
    // });
  }



  // Add Sorting
  direction: any = 'asc';
  sortKey: any = '';
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
    const sortedArray = [...this.propertylist]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.propertylist = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  chart: any;
  // Render All chart when Change Tab
  renderCharts(charts: any) {
    if (charts === '1') {
      this.chart = new ApexCharts(document.querySelector(".apex-charts"), this.totalrevenueChart);
    } else if (charts === '2') {
      this.chart = new ApexCharts(document.querySelector(".apex-charts"), this.totalincomeChart);
    } else if (charts === '3') {
      this.chart = new ApexCharts(document.querySelector(".apex-charts"), this.propertysaleChart);
    } else {
      this.chart = new ApexCharts(document.querySelector(".apex-charts"), this.propetryrentChart);
    }
  }
}
