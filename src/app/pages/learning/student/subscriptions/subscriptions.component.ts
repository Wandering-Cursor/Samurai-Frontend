import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { fetchSubscriptiondata } from 'src/app/store/students/student.action';
import { selectData } from 'src/app/store/students/student.selector';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  providers: [DecimalPipe]
})
export class SubscriptionsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  subscriptions: any;
  term: any
  subscriptionslist: any

  constructor(public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Students', active: true },
      { label: 'My Subscriptions', active: true }
    ];

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchSubscriptiondata());
      this.store.select(selectData).subscribe((data) => {
        this.subscriptions = data;
        this.subscriptionslist = data;
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)
  }


  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.subscriptions]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.subscriptions = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }
  // filterdata
  filterdata() {
    if (this.term) {
      this.subscriptions = this.subscriptionslist.filter((el: any) => el.title.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.subscriptions = this.subscriptionslist
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;

    if (this.term && this.subscriptions.length === 0) {
      noResultElement.style.display = 'block';
    } else {
      noResultElement.style.display = 'none';
    }
  }

}
