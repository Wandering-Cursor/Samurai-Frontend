import { Component } from '@angular/core';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  constructor() { }

  ngOnInit(): void {
    /**
    * BreadCrumb
    */
    this.breadCrumbItems = [
      { label: 'Forms' },
      { label: 'Wizard', active: true }
    ];
  }
  change(event: any) {
  }

    // File Upload
    imageURL: any;
    fileChange(event: any) {
      let fileList: any = (event.target as HTMLInputElement);
      let file: File = fileList.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageURL = reader.result as string;
          document.querySelectorAll('#user-img').forEach((element: any) => {
            element.src = this.imageURL;
          });
      }
  
      reader.readAsDataURL(file)
    }

}
