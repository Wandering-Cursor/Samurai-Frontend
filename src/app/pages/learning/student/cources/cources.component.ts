import { Component } from '@angular/core';
// data store
import { Store } from '@ngrx/store';
import { selectCoucesData } from 'src/app/store/students/student.selector';
import { fetchCourcesdata } from 'src/app/store/students/student.action';

@Component({
  selector: 'app-cources',
  templateUrl: './cources.component.html',
  styleUrls: ['./cources.component.scss']
})
export class CourcesComponent {
  breadCrumbItems!: Array<{}>;
  bsInlineValue = new Date();
  courseList: any;

  constructor(public store: Store) {

  }
  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Students', active: true },
      { label: 'My Courses', active: true }
    ];

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchCourcesdata());
      this.store.select(selectCoucesData).subscribe((data) => {
        this.courseList = data;
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)
  }
}
