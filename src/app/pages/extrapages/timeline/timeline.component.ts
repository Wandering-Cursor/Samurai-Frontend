import { Component } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
  
// Timeline Component
export class TimelineComponent {
    // bread crumb items
    breadCrumbItems!: Array<{}>;
  
    ngOnInit(): void {
      /**
       * BreadCrumb
       */
      this.breadCrumbItems = [
        { label: 'Pages', active: true },
        { label: 'Timeline', active: true }
      ];
    }
}
