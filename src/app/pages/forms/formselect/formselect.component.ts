import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formselect',
  templateUrl: './formselect.component.html',
  styleUrls: ['./formselect.component.scss']
})
export class FormselectComponent {
  // bread crumb items
  breadCrumbItems!: Array<{}>;


  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Form Select', active: true }
    ];
  }

  /**
    * Default Select2
    */
  selectedAccount: any = 'This is a placeholder';
  Default = [
    { name: 'Choice 1' },
    { name: 'Choice 2' },
    { name: 'Choice 3' },
  ];

  /**
   * Option groups Select2
   */
  selectedGroup = 'Choose a city';
  Groups = [
    { name: 'Montreal', country: 'CA', child: { state: 'Active' } },
    { name: 'Toronto', country: 'CA', child: { state: 'Active' } },
    { name: 'Vancouver', country: 'CA', child: { state: 'Active' } },
    { name: 'Lyon', country: 'FR', child: { state: 'Active' } },
    { name: 'Marseille', country: 'FR', child: { state: 'Active' } },
    { name: 'Paris', country: 'FR', child: { state: 'Active' } },
    { name: 'Barcelona', country: 'SP', child: { state: 'Active' } },
    { name: 'Madrid', country: 'SP', child: { state: 'Active' } },
    { name: 'Liverpool', country: 'UK', child: { state: 'Active' } },
    { name: 'London', country: 'UK', child: { state: 'Active' } },
    { name: 'Manchester', country: 'UK', child: { state: 'Active' } },
    { name: 'Michigan', country: 'US', child: { state: 'Active' } },
    { name: 'New York', country: 'US', child: { state: 'Active' } },
    { name: 'Washington', country: 'US', child: { state: 'Inactive' } }
  ];

  /**
 * Option Disabled groups Select2
 */
  selectedOption = 'Label Six';
  Options = [
    { name: 'Label Five' },
    { name: 'Label Four', 'disabled': true },
    { name: 'Label One' },
    { name: 'Label Six' },
    { name: 'Label Three' },
    { name: 'Label Two', 'disabled': true },
    { name: 'Zero' }];

  /**
* Option Disabled groups Select2
*/
  searchselectedOption = 'Label Six';
  searchOptions = [
    { name: 'Label Five' },
    { name: 'Label Four', 'disabled': true },
    { name: 'Label One' },
    { name: 'Label Six' },
    { name: 'Label Three' },
    { name: 'Label Two', 'disabled': true },
    { name: 'Zero' }];

  /**
   * Multiple Default Select2
   */
  multiDefaultOption = 'Adam';

  /**
* Multiple Default Select2
*/
  selectValue = ['Alaska', 'Hawaii', 'California', 'Nevada', 'Oregon', 'Washington', 'Arizona', 'Colorado', 'Idaho', 'Montana', 'Nebraska', 'New Mexico', 'North Dakota', 'Utah', 'Wyoming', 'Alabama', 'Arkansas', 'Illinois', 'Iowa'];

  /**
  * Disabled Select2
  */
  disable = true;
  selectedPeople = [
    { name: 'josh@joshuajohnson.co.uk', disabled: true },
    { name: 'joe@bloggs.co.uk', disabled: true }
  ];
}
