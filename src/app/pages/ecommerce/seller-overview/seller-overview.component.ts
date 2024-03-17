import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { sellerOverview } from './data';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { addSellerOverviewdata, deleteSellerOverviewData, fetchsellerOverviewdata, fetchsellerdata, updateSellerdataOverviewData } from 'src/app/store/Seller/seller.action';
import { selectData, selectoverviewData } from 'src/app/store/Seller/seller.selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { cloneDeep } from 'lodash';


@Component({
  selector: 'app-seller-overview',
  templateUrl: './seller-overview.component.html',
  styleUrls: ['./seller-overview.component.scss'],
  providers: [DecimalPipe]
})

// Seller Overview Component
export class SellerOverviewComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  term: any
  portfolioccharts: any;
  deleteID: any;
  files: File[] = [];
  overviewForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;
  sellerlist: any
  sellers: any;
  seller: any
  endItem: any
  @ViewChild('showModal', { static: false }) showModal?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  editseller: any;


  constructor(private formBuilder: UntypedFormBuilder, public store: Store) {
  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Ecommerce', active: true },
      { label: 'Sellers Overview', active: true }
    ];

    // Chart Color Data Get Function
    this._portfolioccharts('["--tb-primary", "--tb-light", "--tb-secondary"]');

    /**
     * Form Validation
     */
    this.overviewForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      stock: ['', [Validators.required]],
      price: ['', [Validators.required]],
      img: ['']
    });

    // fetch data
    setTimeout(() => {
      this.store.dispatch(fetchsellerOverviewdata());
      this.store.select(selectoverviewData).subscribe((data) => {
        this.sellerlist = data;
        this.seller = data;
        this.sellerlist = cloneDeep(this.seller.slice(0, 8));
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)
  }

  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.overviewForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
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
    const sortedArray = [...this.sellerlist]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.sellerlist = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
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
  private _portfolioccharts(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.portfolioccharts = {
      series: [{
        name: 'Earnings',
        type: 'column',
        data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 21, 37, 23, 11, 22]
      }, {
        name: 'Orders',
        type: 'area',
        data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43, 45, 64, 44, 55, 41]
      }, {
        name: 'Refunds',
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
        y: {
          formatter: function (y: any) {
            if (typeof y !== "undefined") {
              return "$" + y.toFixed(0);
            }
            return y;

          }
        }
      },
      colors: colors,
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._portfolioccharts('["--tb-primary", "--tb-light", "--tb-secondary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  // Edit Data
  editList(id: any) {
    this.showModal?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'
    this.editseller = this.sellerlist[id]
    this.uploadedFiles.push({ 'dataURL': this.editseller.img, 'name': 'image', 'size': 1024, });
    this.overviewForm.patchValue(this.sellerlist[id]);
  }

  // add Product
  saveOverview() {
    if (this.overviewForm.valid) {
      if (this.overviewForm.get('id')?.value) {
        const updatedData = {
          orders: this.editseller.orders,
          rating: this.editseller.rating,
          publishedDate: this.editseller.publishedDate,
          ...this.overviewForm.value
        };
        this.store.dispatch(updateSellerdataOverviewData({ updatedData }));
      }
      else {
        this.overviewForm.controls['id'].setValue(this.sellerlist.length + 1)
        const newData = {
          orders: '0',
          rating: '-',
          publishedDate: '02 May 2023',
          ...this.overviewForm.value
        }
        this.store.dispatch(addSellerOverviewdata({ newData }))
      }
      this.uploadedFiles = [];
      this.overviewForm.reset();
      this.showModal?.hide()
    }
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.sellerlist.forEach((x: { state: any; }) => x.state = ev.target.checked)
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.sellerlist.length; i++) {
      if (this.sellerlist[i].state == true) {
        result = this.sellerlist[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.sellerlist.length; i++) {
      if (this.sellerlist[i].states == true) {
        result = this.sellerlist[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }



  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  // deleteddata
  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteSellerOverviewData({ id: this.deleteID.toString() }));
    }
    this.store.dispatch(deleteSellerOverviewData({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }

  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.sellerlist = this.seller.slice(startItem, this.endItem);
  }


  // filterdata
  filterdata() {
    if (this.term) {
      this.sellerlist = this.seller.filter((el: any) => el.category.toLowerCase().includes(this.term.toLowerCase()) || el.name.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.sellerlist = this.seller.slice(0, 10);
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;
    if (this.term && this.sellerlist.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }
}
