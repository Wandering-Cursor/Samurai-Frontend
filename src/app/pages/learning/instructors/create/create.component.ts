import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})

// Create Component
export class CreateComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  formGroups: FormGroup[] = [];
  educationForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Instructors', active: true },
      { label: 'Create Instructor', active: true }
    ];

    this.educationForm = this.formBuilder.group({
      degree: [''],
      name: [''],
      year: [''],
      to: [''],
      description: ['']
    });
    this.formGroups.push(this.educationForm);
  }

  /**
* Default Select2
*/
  selectedAccount = [{ name: 'Marketing' },];
  Skills = [
    { name: 'Marketing' },
    { name: 'Management' },
    { name: 'Shopify' },
    { name: 'Development' },
    { name: 'Content' },
    { name: 'SEO' }
  ];

  Language = [
    { name: 'English' },
    { name: 'France' }
  ]

  // add Form
  addForm() {
    const formGroupClone = this.formBuilder.group(this.educationForm.value);
    this.formGroups.push(formGroupClone);
  }

  // Delete Form
  deleteForm(id: any) {
    this.formGroups.splice(id, 1)
  }
}
