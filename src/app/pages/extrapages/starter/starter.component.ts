import { Component } from '@angular/core';

@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.scss']
})
  
// Starter Component
export class StarterComponent {

    // bread crumb items
  breadCrumbItems!: Array<{}>;
  
  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Pages', active: true },
      { label: 'Starter', active: true }
    ];
  }

}
