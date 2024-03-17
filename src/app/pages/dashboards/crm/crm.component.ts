import { Component, QueryList, ViewChildren } from '@angular/core';

import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { getChartColorsArray, shuffleArray } from 'src/app/shared/commonFunction';
import { Store } from '@ngrx/store';
import { fetchdealData, fetchleadData, fetchtableData, fetchtaksData } from 'src/app/store/CRM/crm.actions';
import { selectabledata, selectdealData, selectleadData, selecttaskdata } from 'src/app/store/CRM/crm-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-crm',
  templateUrl: './crm.component.html',
  styleUrls: ['./crm.component.scss'],
  providers: [DecimalPipe]
})
export class CrmComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  statedata: any;
  dealList: any
  realizedChart: any;
  balance_overviewChart: any;
  emailSentChart: any;
  usersActivityChart: any;
  syncStatusBreakdownChart: any;
  taskList: any
  contact: any;
  leadlist: any;
  endItem: any


  sortValue: any = 'Leads Score';

  constructor(public store: Store) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Dashboards' },
      { label: 'CRM', active: true }
    ];

    // store
    this.store.dispatch(fetchtableData());
    this.store.select(selectabledata).subscribe((data) => {
      this.statedata = data;
    });
    this.store.dispatch(fetchleadData());
    this.store.select(selectleadData).subscribe((data) => {
      this.contact = data;
      this.leadlist = data;
      this.contact = this.leadlist.slice(0, 5)
    });
    this.store.dispatch(fetchdealData());
    this.store.select(selectdealData).subscribe((data) => {
      this.dealList = data;
    });
    this.store.dispatch(fetchtaksData());
    this.store.select(selecttaskdata).subscribe((data) => {
      this.taskList = data;
    });


    // Chart Color Data Get Function
    this._realizedChart('["--tb-primary", "--tb-secondary", "--tb-danger"]');
    this._balance_overviewChart('["--tb-primary", "--tb-light","--tb-secondary"]');
    this._emailSentChart('["--tb-primary", "--tb-success", "--tb-secondary"]');
    this._usersActivityChart('["--tb-primary", "--tb-light"]');
    this._syncStatusBreakdownChart('["--tb-primary", "--tb-primary-rgb, 0.85", "--tb-primary-rgb, 0.60", "--tb-primary-rgb, 0.50", "--tb-info"]');
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
    colors = getChartColorsArray(colors);
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
        height: 403,
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
* Balance Overview Charts
*/

  changebalanceValue() {
    var revenueSeries = [49, 62, 55, 67, 73, 89, 110, 120, 115, 129, 123, 133]
    const shuffledrevenueSeries = [...revenueSeries];
    shuffleArray(shuffledrevenueSeries);

    var expenseSeries = [62, 76, 67, 49, 63, 77, 70, 86, 92, 103, 87, 93]
    const shuffledexpenseSeries = [...expenseSeries];
    shuffleArray(shuffledexpenseSeries);

    var ratioSeries = [12, 36, 29, 33, 37, 42, 58, 67, 49, 33, 24, 18]
    const shuffledratioSeries = [...ratioSeries];
    shuffleArray(shuffledratioSeries);

    setTimeout(() => {
      this.balance_overviewChart.series = [{
        name: 'Total Revenue',
        data: shuffledrevenueSeries
      },
      {
        name: 'Total Expense',
        data: shuffledexpenseSeries
      },
      {
        name: 'Profit Ratio',
        data: shuffledratioSeries
      }
      ];
    }, 500);
  }

  private _balance_overviewChart(colors: any) {
    colors = getChartColorsArray(colors);
    this.balance_overviewChart = {
      series: [{
        name: 'Total Revenue',
        data: [49, 62, 55, 67, 73, 89, 110, 120, 115, 129, 123, 133]
      }, {
        name: 'Total Expense',
        data: [62, 76, 67, 49, 63, 77, 70, 86, 92, 103, 87, 93]
      }, {
        name: 'Profit Ratio',
        data: [12, 36, 29, 33, 37, 42, 58, 67, 49, 33, 24, 18]
      }],
      chart: {
        height: 300,
        type: 'line',
        toolbar: {
          show: false
        },
        dropShadow: {
          enabled: true,
          enabledOnSeries: undefined,
          top: 0,
          left: 0,
          blur: 3,
          color: colors,
          opacity: 0.25
        }
      },
      markers: {
        size: 0,
        strokeColors: colors,
        strokeWidth: 2,
        strokeOpacity: 0.9,
        fillOpacity: 1,
        radius: 0,
        hover: {
          size: 5,
        }
      },
      grid: {
        show: true,
        padding: {
          top: -20,
          right: 0,
          bottom: 0,
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false
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
      stroke: {
        width: [2, 2, 2],
        curve: 'smooth'
      },
      colors: colors,
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._balance_overviewChart('["--tb-primary", "--tb-light","--tb-secondary"]');
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
    colors = getChartColorsArray(colors);
    this.emailSentChart = {
      series: [63, 87, 33],
      chart: {
        height: 363,
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

  /**
* User Activity Charts
*/
  changeActivity() {
    var ActiveSeries = [44, 55, 41, 67, 22, 43]
    const shuffledActivSeries = [...ActiveSeries];
    shuffleArray(shuffledActivSeries);

    var NewSeries = [13, 23, 20, 8, 13, 27]
    const shuffledNewSeries = [...NewSeries];
    shuffleArray(shuffledNewSeries);

    setTimeout(() => {
      this.usersActivityChart.series = [{
        name: 'Activ User',
        data: shuffledActivSeries
      }, {
        name: 'New Users',
        data: shuffledNewSeries
      }]
    }, 500);
  }

  private _usersActivityChart(colors: any) {
    colors = getChartColorsArray(colors);
    this.usersActivityChart = {
      series: [{
        name: 'Activ User',
        data: [44, 55, 41, 67, 22, 43]
      }, {
        name: 'New Users',
        data: [13, 23, 20, 8, 13, 27]
      }],
      chart: {
        type: 'bar',
        height: 330,
        stacked: true,
        toolbar: {
          show: false
        },
        zoom: {
          enabled: true
        }
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '40%',
        },
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
      },
      grid: {
        show: true,
        padding: {
          top: -18,
          right: 0,
          bottom: 0,
        },
      },
      legend: {
        position: 'bottom',
      },
      fill: {
        opacity: 1
      },
      colors: colors,
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._usersActivityChart('["--tb-primary", "--tb-light"]');
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
    colors = getChartColorsArray(colors);
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

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.contact = this.leadlist.slice(startItem, this.endItem);
  }

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
    const sortedArray = [...this.contact]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.contact = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
}
