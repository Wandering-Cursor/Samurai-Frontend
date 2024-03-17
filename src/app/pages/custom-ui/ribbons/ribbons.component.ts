import { Component } from '@angular/core';

@Component({
  selector: 'app-ribbons',
  templateUrl: './ribbons.component.html',
  styleUrls: ['./ribbons.component.scss']
})
export class RibbonsComponent {
  // bread crum items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Custom UI' }, { label: 'Ribbons', active: true }];
  }
}
