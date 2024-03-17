import { Component, QueryList, ViewChildren } from '@angular/core';

// Data Get
import { gridlist } from './data';

import {GridJsModel} from './gridjs.model';
import { GridJsService } from './gridjs.service';
import { NgbdGridJsSortableHeader, SortEvent } from './gridjs-sortable.directive';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-gridjs',
  templateUrl: './gridjs.component.html',
  styleUrls: ['./gridjs.component.scss'],
  providers: [GridJsService, DecimalPipe]
})
export class GridjsComponent {
 // bread crumb items
 breadCrumbItems!: Array<{}>;

 // Table data
 gridjsList$!: Observable<GridJsModel[]>;
 total$: Observable<number>;
 @ViewChildren(NgbdGridJsSortableHeader) headers!: QueryList<NgbdGridJsSortableHeader>;

 constructor(public service: GridJsService, private formBuilder: UntypedFormBuilder) {
  this.gridjsList$ = service.countries$;
  this.total$ = service.total$;
 }
  
  ngOnInit(): void {
   /**
    * BreadCrumb
    */
   this.breadCrumbItems = [
    { label: 'Tables' },
    { label: 'Grid Js', active: true }
  ];
  }

  /**
  * Sort table data
  * @param param0 sort the column
  *
  */
  onSort({column, direction}: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}
