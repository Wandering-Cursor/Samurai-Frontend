import { Component, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UntypedFormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

import { filemanagerModel } from './file-manager.model';
import { fliedata, folder, fliefolder, filerecent } from './data';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  providers: [DecimalPipe]
})
export class FileManagerComponent {

  folderData: any;
  recentDatas: any;
  fileList!: Observable<filemanagerModel[]>;
  fliefolders: any;
  file: any;
  storageChart: any;
  sortValue: any = "Docs Type";
  files: File[] = [];
  endItem: any;


  constructor(private formBuilder: UntypedFormBuilder) {
  }

  ngOnInit(): void {

    document.body.classList.add('file-detail-show');

    // Folder Data Fetch
    this.file = fliedata;
    this.folderData = folder;
    this.fliefolders = fliefolder;

    this.recentDatas = filerecent

    // Chart Color Data Get Function
    this._storageChart('["--tb-secondary", "--tb-primary", "--tb-light","--tb-danger", "--tb-success"]');

  }

  // file upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Open Detail
  openDetail(id: any) {
    (document.querySelector('.file-manager-right-wrapper') as HTMLElement).style.display = 'block'
  }

  // Close Detail
  closeDetail() {
    (document.querySelector('.file-manager-right-wrapper') as HTMLElement).style.display = 'none'
  }

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
    const sortedArray = [...this.recentDatas]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.recentDatas = sortedArray;
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
* Page Overview Charts
*/
  private _storageChart(colors: any) {
    colors = this.getChartColorsArray(colors);
    this.storageChart = {
      grid: {
        left: '0%',
        right: '0%',
        bottom: '0%',
        top: '4%',
        containLabel: true
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        // show: false,
        bottom: '-5px',
        left: 'center',
        textStyle: {
          color: "#87888a"
        }
      },
      series: [
        {
          name: 'Storage',
          type: 'pie',
          radius: ['75%', '90%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 8,
            borderColor: '#fff',
            borderWidth: 5
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 15,
              fontWeight: 'bold'
            }
          },
          tooltip: {
            backgroundColor: "#fff",
            padding: 15,
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'Dcomuents' },
            { value: 735, name: 'Audio' },
            { value: 580, name: 'Images' },
            { value: 484, name: 'Video' },
            { value: 300, name: 'Others' }
          ],
          color: colors
        }
      ]
    }
  }

  // Pagination
  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.recentDatas = filerecent.slice(startItem, this.endItem);
  }
}
