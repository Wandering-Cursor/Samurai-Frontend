import { Component } from '@angular/core';
import { chatMessagesData } from './data';

@Component({
  selector: 'app-advanced',
  templateUrl: './advance.component.html',
  styleUrls: ['./advance.component.scss']
})
export class AdvanceComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  selectedCountry: any;
  selectedFlag: any;
  
  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form Advanced', active: true }
    ];

    this.selectedCountry = {
      "flagImg": "assets/images/flags/us.svg",
      "countryName": "United States of America",
      "countryCode": "+1"
    }

    this.selectedFlag = {
      "flagImg": "assets/images/flags/us.svg",
      "countryName": "United States of America",
      "countryCode": "+1"
    }
  }

  /**
   * Default Select2
   */
  selectedAccount = 'This is a placeholder';
  public Default = chatMessagesData;

  // Default Increment
  quantity: any = 2;
  defaultincrese(id: any, qid: any) {
    if (id == '0' && this.quantity > 0) {
      this.quantity--
    }
    if (id == '1') {
      this.quantity++
    }
    (document.getElementById('quantity' + qid) as HTMLInputElement).value = this.quantity;
  }

  keyword = 'name';
  // Fruit Data
  public Fruit = [
    {
      id: 1,
      name: 'Apple',
    },
    {
      id: 2,
      name: 'Banana',
    },
    {
      id: 3,
      name: 'Blueberry',
    },
    {
      id: 4,
      name: 'Cherry',
    },
    {
      id: 5,
      name: 'Coconut',
    },
    {
      id: 6,
      name: 'Kiwi',
    },
    {
      id: 7,
      name: 'Lemon',
    },
    {
      id: 8,
      name: 'Lime',
    },
    {
      id: 9,
      name: 'Mango',
    },
    {
      id: 10,
      name: 'Orange',
    }
  ];

  // Cars Data
  public Cars = [
    {
      id: 1,
      name: 'Chevrolet',
    },
    {
      id: 2,
      name: 'Fiat',
    },
    {
      id: 3,
      name: 'Ford',
    },
    {
      id: 4,
      name: 'Honda',
    },
    {
      id: 5,
      name: 'Hyundai',
    },
    {
      id: 6,
      name: 'Hyundai',
    },
    {
      id: 7,
      name: 'Kia',
    },
    {
      id: 8,
      name: 'Mahindra',
    },
    {
      id: 9,
      name: 'Maruti',
    },
    {
      id: 10,
      name: 'Mitsubishi',
    },
    {
      id: 11,
      name: 'MG',
    },
    {
      id: 12,
      name: 'Nissan',
    },
    {
      id: 13,
      name: 'Renault',
    },
    {
      id: 14,
      name: 'Skoda',
    },
    {
      id: 15,
      name: 'Tata',
    },
    {
      id: 16,
      name: 'Toyato',
    },
    {
      id: 17,
      name: 'Volkswagen',
    }
  ];

  selectValue(data: any) {
    this.selectedCountry = data
  }

  selectCode(data: any) {
    this.selectedFlag = data
  }

  selectEvent(item: any) { }
  onChangeSearch(search: string) { }
  onFocused(e: any) { }
}
