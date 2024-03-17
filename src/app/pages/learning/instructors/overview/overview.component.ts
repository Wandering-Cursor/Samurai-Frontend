import { Component, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

import { reviews } from '../../courses/overview/data';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { course, students } from './data';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

// Overview Component
export class OverviewComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  sessionChart: any;
  files: File[] = [];
  reviewForm!: UntypedFormGroup;
  reviewData: any;
  submitted: boolean = false;
  deleteId: any;

  courselist: any;
  studentlist: any;

  @ViewChild('addReview', { static: false }) addReview?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  searchResults: any;
  searchTerm: any;
  searchText: any;
  deleteids: any;
  deleteType: any;
  currentTab = 'coursesList';

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Instructors', active: true },
      { label: 'Overview', active: true }
    ];

    /**
 * Form Validation
 */
    this.reviewForm = this.formBuilder.group({
      _id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      img: ['']
    });

    // Fetch Data
    this.reviewData = reviews.reverse()
    this.courselist = course;
    this.studentlist = students;

    // Chart Color Data Get Function
    this._sessionChart('["--tb-primary", "--tb-secondary"]');

  }

  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

  // File Upload
  profile: any = [];
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.profile.push(event[0].dataURL)
      this.reviewForm.controls['img'].setValue(this.profile);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
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
* Session Charts
*/
  private _sessionChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.sessionChart = {
      series: [{
        name: "Active Students",
        data: [3, 6, 2, 4, 7, 9, 15, 10, 19, 22, 27, 21, 34, 23, 29, 32, 41, 34, 29, 37, 64, 55, 49, 69, 78, 73, 69, 83]
      }, {
        name: "New Enrollment",
        data: [10, 16, 25, 14, 29, 33, 47, 53, 41, 55, 63, 53, 66, 71, 79, 70, 73, 84, 92, 83, 96, 93, 101, 109, 99, 87, 93, 107]
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
        categories: ['02/01/2023 GMT', '02/02/2023 GMT', '02/03/2023 GMT', '02/04/2023 GMT',
          '02/05/2023 GMT', '02/06/2023 GMT', '02/07/2023 GMT', '02/08/2023 GMT', '02/09/2023 GMT', '02/10/2023 GMT', '02/11/2023 GMT', '02/12/2023 GMT', '02/13/2023 GMT',
          '02/14/2023 GMT', '02/15/2023 GMT', '02/16/2023 GMT', '02/17/2023 GMT', '02/18/2023 GMT', '02/19/2023 GMT', '02/20/2023 GMT', '02/21/2023 GMT', '02/22/2023 GMT',
          '02/23/2023 GMT', '02/24/2023 GMT', '02/25/2023 GMT', '02/26/2023 GMT', '02/27/2023 GMT', '02/28/2023 GMT'
        ]
      },
      colors: colors,
    }

    const attributeToMonitor = 'data-theme';

    const observer = new MutationObserver(() => {
      this._sessionChart('["--tb-primary", "--tb-secondary"]');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: [attributeToMonitor]
    });
  }

  // Edit Review
  editReview(id: any) {
    this.uploadedFiles = []
    this.addReview?.show()
    this.reviewForm.controls['_id'].setValue(this.reviewData[id].id);
    this.reviewForm.controls['title'].setValue(this.reviewData[id].title);
    this.reviewForm.controls['rate'].setValue(this.reviewData[id].rating);
    this.reviewForm.controls['content'].setValue(this.reviewData[id].content);
    this.reviewData[id].profile.forEach((element:any) => {
      this.uploadedFiles.push({ 'dataURL': element, 'name': 'image', 'size': 1024, });
    });
    this.reviewForm.controls['img'].setValue(this.uploadedFiles);
  }

  // Add Review
  saveReview() {
    if (this.reviewForm.valid) {
      if (this.reviewForm.get('_id')?.value) {
        this.reviewData = reviews.map((order: { id: any; }) => order.id === this.reviewForm.get('_id')?.value ? { ...order, ...this.reviewForm.value } : order);
      } else {
        const title = this.reviewForm.get('title')?.value;
        const rating = this.reviewForm.get('rate')?.value;
        const content = this.reviewForm.get('content')?.value;
        const profile = this.reviewForm.get('img')?.value;

        this.reviewData.push({
          id: this.reviewData.length + 1,
          rating,
          title,
          content,
          date: '',
          user: '',
          profile: this.profile
        })
      }
      this.addReview?.hide()
      this.reviewForm.reset();
      this.uploadedFiles = [];
      this.profile = [];
    }
    this.submitted = true

  }

  // Delete Review
  removeReview(id: any) {
    this.deleteId = id
    this.removeItemModal?.show()
  }

  DeleteReview() {
    this.reviewData.splice(this.deleteId, 1)
    this.removeItemModal?.hide()
  }

  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc'
    } else {
      this.direction = 'asc'
    }
    this.studentlist.sort((a: any, b: any) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
  }

  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // Toggle Connect Button
  connectBtn(ev: any) {
    ev.target.closest('button').classList.toggle('active')
  }

  // Search Data
  performSearch(): void {
    this.searchResults = course.filter((item: any) => {
      return item.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.price.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.type.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.duration.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.students.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.rating.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.status.toLowerCase().includes(this.searchTerm.toLowerCase())
    })
    this.courselist = this.searchResults
  }

  studentSearch(): void {
    this.searchResults = students.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchText.toLowerCase())
        || item.email.toLowerCase().includes(this.searchText.toLowerCase())
        || item.contact.toLowerCase().includes(this.searchText.toLowerCase())
        || item.course.toLowerCase().includes(this.searchText.toLowerCase())
        || item.date.toLowerCase().includes(this.searchText.toLowerCase())
        || item.status.toLowerCase().includes(this.searchText.toLowerCase())
    })
    this.studentlist = this.searchResults
  }

  // Remove Data
  removeData(id: any, type: any) {
    this.deleteids = id
    this.deleteType = type;
    this.deleteRecordModal?.show()
  }

  confirmDelete() {
    if (this.deleteType == '1') {
      this.courselist = this.courselist.filter((product: any) => {
        return this.deleteids != product.id;
      });
    } else {
      this.studentlist = this.studentlist.filter((product: any) => {
        return this.deleteids != product.id;
      });
    }
    this.deleteids = ''
    this.deleteType = ''
    this.deleteRecordModal?.hide()
  }

}
