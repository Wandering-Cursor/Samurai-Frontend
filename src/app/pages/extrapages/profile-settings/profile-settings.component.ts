import { Component } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-profile-settings',
  templateUrl: './profile-settings.component.html',
  styleUrls: ['./profile-settings.component.scss']
})

// Profile Setting component
export class ProfileSettingsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  fieldTextType!: boolean;
  fieldTextType1!: boolean;
  fieldTextType2!: boolean;
  bsConfig?: Partial<BsDatepickerConfig>;

  formGroups: FormGroup[] = [];
  educationForm!: FormGroup;
  currentTab = 'personalDetails';

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Pages', active: true },
      { label: 'Profile Settings', active: true }
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
  selectedAccount = 'This is a placeholder';
  Skills = [
    { name: 'Illustrator' },
    { name: 'Photoshop' },
    { name: 'CSS' },
    { name: 'HTML' },
    { name: 'Javascript' },
    { name: 'Python' },
    { name: 'PHP' },
  ];

  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }

  // File Upload
  imageURL: any;
  fileChange(event: any, id: any) {
    let fileList: any = (event.target as HTMLInputElement);
    let file: File = fileList.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
      if (id == '0') {
        document.querySelectorAll('#cover-img').forEach((element: any) => {
          element.src = this.imageURL;
        });
      }
      if (id == '1') {
        document.querySelectorAll('#user-img').forEach((element: any) => {
          element.src = this.imageURL;
        });
      }
    }

    reader.readAsDataURL(file)
  }

  /**
  * Password Hide/Show
  */
  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
  toggleFieldTextType1() {
    this.fieldTextType1 = !this.fieldTextType1
  }
  toggleFieldTextType2() {
    this.fieldTextType2 = !this.fieldTextType2;
  }

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


