import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
  
// Privacy Policy component
export class PrivacyPolicyComponent {
    // bread crumb items
    breadCrumbItems!: Array<{}>;
  
    ngOnInit(): void {
      /**
       * BreadCrumb
       */
      this.breadCrumbItems = [
        { label: 'Pages', active: true },
        { label: 'Privacy Policy', active: true }
      ];
    }
}
