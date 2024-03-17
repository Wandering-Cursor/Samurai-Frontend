import { Component } from '@angular/core';

@Component({
  selector: 'app-scrollspy',
  templateUrl: './scrollspy.component.html',
  styleUrls: ['./scrollspy.component.scss']
})
export class ScrollspyComponent {
  currentSection = 'fat';

  // bread crum items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    this.breadCrumbItems = [{ label: 'Advance UI' }, { label: 'ScrollSpy', active: true }];
  }


  onSectionChange(sectionId: string) {
    this.currentSection = sectionId;
  }

  scrollTo(section: any) {
    document.querySelector('#' + section)?.scrollIntoView();
  }

  constructor() { }

}
