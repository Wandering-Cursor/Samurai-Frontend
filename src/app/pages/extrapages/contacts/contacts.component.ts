import { Component } from '@angular/core';

// Data Get
import { contactData } from './data';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})

// contact component
export class ContactsComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  contactlist: any;
  endItem: any = 12;

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Pages', active: true },
      { label: 'Contact', active: true }
    ];

    // Fetch Data
    this.contactlist = contactData;

  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.contactlist = contactData.slice(startItem, this.endItem);
  }
}
