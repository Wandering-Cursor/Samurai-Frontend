import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { fetchlistingGridData } from 'src/app/store/App-realestate/apprealestate.action';
import { selectData } from 'src/app/store/App-realestate/apprealestate-selector';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
  providers: [DecimalPipe]
})

// Overview Component
export class OverviewComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  agentOverviewCharts: any;
  products: any;
  masterSelected!: boolean;
  productslist: any
  bedroom: any;
  deleteID: any;
  currentTab = 'grid';

  constructor(public store: Store) {
  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Agents', active: true },
      { label: 'Overview', active: true }
    ];

    // Chart Color Data Get Function
    this._agentOverviewCharts('["--tb-primary", "--tb-light", "--tb-secondary"]');

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchlistingGridData());
      this.store.select(selectData).subscribe((data) => {
        this.products = data;
        this.productslist = data;
        this.products = this.productslist.slice(0, 8)
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)
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
  * Agent Overview Charts
  */
  private _agentOverviewCharts(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.agentOverviewCharts = {
      series: [{
        name: 'Total Property',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 21, 37, 23, 11, 22]
      }, {
        name: 'Property Rent',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 45, 64, 44, 55, 41]
      }, {
        name: 'Property Sold',
        type: 'line',
        data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 25, 21, 30, 25, 36]
      }],
      chart: {
        height: 400,
        type: 'line',
        stacked: false,
        toolbar: {
          show: false,
        }
      },
      stroke: {
        width: [0, 2, 3],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '25%'
        }
      },
      fill: {
        opacity: [1, 0.08, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: "vertical",
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      legend: {
        show: true,
        position: 'top',
        horizontalAlign: 'right',
      },
      labels: ['01/01/2022', '02/01/2022', '03/01/2022', '04/01/2022', '05/01/2022', '06/01/2022', '07/01/2022',
        '08/01/2022', '09/01/2022', '10/01/2022', '11/01/2022', '12/01/2022', '01/01/2023', '02/01/2023', '03/01/2023', '04/01/2023'
      ],
      markers: {
        size: 0
      },
      xaxis: {
        type: 'datetime'
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      colors: colors
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._agentOverviewCharts('["--tb-primary", "--tb-light", "--tb-secondary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });

  }

  // Add to Starred
  addStarr(ev: any) {
    ev.target.classList.toggle('active')
  }
}
