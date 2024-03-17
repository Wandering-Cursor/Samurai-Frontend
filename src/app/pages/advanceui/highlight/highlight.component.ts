import { Component } from '@angular/core';
import * as Prism from 'prismjs';

@Component({
  selector: 'app-highlight',
  templateUrl: './highlight.component.html',
  styleUrls: ['./highlight.component.scss']
})
export class HighlightComponent {
  // bread crum items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Advance UI' }, { label: 'Highlight', active: true }];

    Prism.highlightAll();
  }

  ngAfterViewInit() {
    Prism.highlightAll();
  }

}
