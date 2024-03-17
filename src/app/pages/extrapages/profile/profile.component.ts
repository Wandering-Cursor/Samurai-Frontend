import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})

// profile component
export class ProfileComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Pages', active: true },
      { label: 'Profile', active: true }
    ];
  }

  // follow button toggle
  Followbtn(ev: any) {
    ev.target.closest('button').classList.toggle('active')
  }
}
