import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { fetchearningdataData } from 'src/app/store/App-realestate/apprealestate.action';
import { selectearningdata } from 'src/app/store/App-realestate/apprealestate-selector';
import { Store } from '@ngrx/store';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { earningcard } from 'src/app/core/data';

@Component({
  selector: 'app-earnings',
  templateUrl: './earnings.component.html',
  styleUrls: ['./earnings.component.scss'],
  providers: [DecimalPipe]
})

// Earning Component
export class EarningsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  searchResults: any
  lineChart: any;
  transactionlist: any
  transaction: any;
  earningcards: any;
  currentDate: any;
  searchTerm: any

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
      { label: 'Real Estate', active: true },
      { label: 'Earnings', active: true }
    ];


    // Chart Color Data Get Function
    this._lineChart('["--tb-primary", "--tb-danger"]');

    setTimeout(() => {
      this.store.dispatch(fetchearningdataData());
      this.store.select(selectearningdata).subscribe((data) => {
        this.transaction = data;
        this.transactionlist = data;
        this.transaction = this.transactionlist.slice(0, 10)
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)

    this.earningcards = earningcard;
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
  * Agent Overview Charts
  */
  private _lineChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.lineChart = {
      series: [{
        name: "Daily Earning",
        data: [32, 43, 48, 35, 26, 34, 47, 51, 59, 63, 44, 38, 53, 69, 72, 83, 90, 110, 130, 117, 111, 97, 89, 119, 80, 96, 116, 124]
      }, {
        name: "Expenses",
        data: [15, 35, 18, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29, 32, 41, 34, 29, 37, 70, 55, 49, 37, 21, 54, 36, 45]
      }],
      chart: {
        height: 350,
        type: 'line',
        toolbar: {
          show: false
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
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
      xaxis: {
        type: 'datetime',
        categories: ['03/01/2023 GMT', '03/02/2023 GMT', '03/03/2023 GMT', '03/04/2023 GMT',
          '03/05/2023 GMT', '03/06/2023 GMT', '03/07/2023 GMT', '03/08/2023 GMT', '03/09/2023 GMT', '03/10/2023 GMT', '03/11/2023 GMT', '03/12/2023 GMT', '03/13/2023 GMT',
          '03/14/2023 GMT', '03/15/2023 GMT', '03/16/2023 GMT', '03/17/2023 GMT', '03/18/2023 GMT', '03/19/2023 GMT', '03/20/2023 GMT', '03/21/2023 GMT', '03/22/2023 GMT',
          '03/23/2023 GMT', '03/24/2023 GMT', '03/25/2023 GMT', '03/26/2023 GMT', '03/27/2023 GMT', '03/28/2023 GMT'
        ]
      },
      yaxis: {
        show: false,
      },
      colors: colors
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._lineChart('["--tb-primary", "--tb-danger"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.transaction]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.transaction = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.transactionlist.filter((item: any) => {
      return item.details.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
    this.transaction = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay()
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement

    if (this.searchResults && this.transaction.length == 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }


  // Page Changed
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.transaction = this.transactionlist.slice(startItem, endItem);
  }
}
