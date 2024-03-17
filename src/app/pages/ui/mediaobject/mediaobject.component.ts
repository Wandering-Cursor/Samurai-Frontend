import { Component } from '@angular/core';

@Component({
  selector: 'app-mediaobject',
  templateUrl: './mediaobject.component.html',
  styleUrls: ['./mediaobject.component.scss']
})
export class MediaobjectComponent {
  // bread crum items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Base UI' }, { label: 'Media Object', active: true }];
  }
}
