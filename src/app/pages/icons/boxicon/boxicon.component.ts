import { Component } from '@angular/core';

@Component({
  selector: 'app-boxicon',
  templateUrl: './boxicon.component.html',
  styleUrls: ['./boxicon.component.scss']
})
export class BoxiconComponent {
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    /**
   * BreadCrumb
   */
    this.breadCrumbItems = [
      { label: 'Icons' },
      { label: 'Boxicons', active: true }
    ];
  }
}
