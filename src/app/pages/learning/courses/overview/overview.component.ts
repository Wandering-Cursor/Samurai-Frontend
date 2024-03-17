import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { reviews } from './data';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})

// Overview Component
export class OverviewComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  reviewForm!: UntypedFormGroup;
  reviewData: any;
  submitted: boolean = false;
  deleteId: any;
  files: File[] = [];
  rate: any;
  currentTab = 'description';

  @ViewChild('addReview', { static: false }) addReview?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;

  constructor(private formBuilder: UntypedFormBuilder) { }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Courses', active: true },
      { label: 'Overview', active: true }
    ];

    /**
 * Form Validation
 */
    this.reviewForm = this.formBuilder.group({
      _id: [''],
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      rate: ['', [Validators.required]],
      img: ['']
    });

    // Fetch Data
    this.reviewData = reviews.reverse()
  }

  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

  // File Upload
  profile: any = [];
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.profile.push(event[0].dataURL)
      this.reviewForm.controls['img'].setValue(this.uploadedFiles);
    }, 0);
  }

  // Change Tab Content
  changeTab(tab: string) {
    this.currentTab = tab;
  }


  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // open & close chatbox
  openchatbox() {
    document.getElementById('emailchat-detailElem')?.classList.add('d-block')
  }
  closechatbox() {
    document.getElementById('emailchat-detailElem')?.classList.remove('d-block')
  }

  // Edit Review
  editReview(id: any) {
    this.uploadedFiles = []
    this.addReview?.show()
    this.reviewForm.controls['_id'].setValue(this.reviewData[id].id);
    this.reviewForm.controls['title'].setValue(this.reviewData[id].title);
    this.reviewForm.controls['rate'].setValue(this.reviewData[id].rating);
    this.reviewForm.controls['content'].setValue(this.reviewData[id].content);
    this.reviewData[id].profile.forEach((element:any) => {
      this.uploadedFiles.push({ 'dataURL': element, 'name': 'image', 'size': 1024, });
    });
    this.reviewForm.controls['img'].setValue(this.uploadedFiles);
  
  }

  // Add Review
  saveReview() {
    if (this.reviewForm.valid) {
      if (this.reviewForm.get('_id')?.value) {
        this.reviewData = reviews.map((order: { id: any; }) => order.id === this.reviewForm.get('_id')?.value ? { ...order, ...this.reviewForm.value } : order);
      } else {
        const title = this.reviewForm.get('title')?.value;
        const rating = this.reviewForm.get('rate')?.value;
        const content = this.reviewForm.get('content')?.value;
        const profile = this.reviewForm.get('img')?.value;

        this.reviewData.push({
          id: this.reviewData.length + 1,
          rating,
          title,
          content,
          date: '',
          user: '',
          profile: this.profile
        })
      }
      this.addReview?.hide()
      this.reviewForm.reset();
      this.uploadedFiles = [];
      this.profile = [];
    }
    this.submitted = true

  }

  // Delete Review
  removeReview(id: any) {
    this.deleteId = id
    this.removeItemModal?.show()
  }

  DeleteReview() {
    this.reviewData.splice(this.deleteId, 1)
    this.removeItemModal?.hide()
  }
}
