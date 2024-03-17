import { Component } from '@angular/core';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})
export class AccordionsComponent {
  isCollapsed = false;
  horizontalCollapsed = false;
  arrowCollapsed = false;
  filterCollapsed = false;
  blockCollapsed = false;
  inlineCollapsed = false;
  multiCollapseExample1 = false;
  multiCollapseExample2 = false;

  breadCrumbItems!: Array<{}>;
  isFirstOpen = true
  ngOnInit() { 
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Base UI' },
      { label: 'Accordions', active: true }
    ];
  }
  
}
