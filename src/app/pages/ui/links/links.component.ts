import { Component } from '@angular/core';

@Component({
  selector: 'app-links',
  templateUrl: './links.component.html',
  styleUrls: ['./links.component.scss']
})
export class LinksComponent {
    // bread crum items
    breadCrumbItems!: Array<{}>;
  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Base UI' }, { label: 'Colored Links', active: true }];
  }
}