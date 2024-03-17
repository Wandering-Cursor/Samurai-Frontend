import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  // bread crum items
  breadCrumbItems!: Array<{}>;
  currentTab:any = "developers"

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Base UI' }, { label: 'Tabs', active: true }];
  }

  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }
}

