import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {

  type?: string;
  stacked: any[] = [];

  // bread crum items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {

    this.breadCrumbItems = [{ label: 'Base UI' }, { label: 'Progress', active: true }];

    const types = ['success', 'info'];

    this.stacked = [
      {
        type: undefined,
        value: 15
      },
      {
        type: 'success',
        value: 30
      },
      {
        type: 'info',
        value: 20
      }
    ]

  }
}
