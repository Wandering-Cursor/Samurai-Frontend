import { Component, ViewChild } from '@angular/core';
import { SlickCarouselComponent } from 'ngx-slick-carousel';
// Data Get
import { details, reviews } from './data';
import { reviewsModel } from './product-details.model';
// Swiper

import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})

// Product Detail Component
export class ProductDetailsComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  reviewForm!: UntypedFormGroup;
  productdetail: any;
  reviewData!: reviewsModel[];
  submitted: boolean = false;
  deleteId: any;


  files: File[] = [];

  // @ViewChild('usefulSwiper', { static: false }) usefulSwiper?: SwiperComponent;
  @ViewChild('addReview', { static: false }) addReview?: ModalDirective;
  @ViewChild('removeItemModal', { static: false }) removeItemModal?: ModalDirective;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
  constructor(private formBuilder: UntypedFormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Ecommerce' },
      { label: 'Product Overview', active: true }
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
    this.productdetail = details
    this.reviewData = reviews.reverse()
  }

  slideConfig = {
    // Configuration options for the ngx-slick-carousel
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  slidesConfig = {
    // Configuration options for the ngx-slick-carousel
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  }

  slickChange(event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
  }

  slidePreview(id: any, event: any) {
    const swiper = document.querySelectorAll('.swiperlist')
    swiper.forEach((el: any) => {
      el.classList.remove('swiper-slide-thumb-active')
    })
    event.target.closest('.swiperlist').classList.add('swiper-slide-thumb-active')
    this.slickModal.slickGoTo(id)
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
      this.reviewForm.controls['img'].setValue(this.profile);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }


  // Edit Review
  editReview(id: any) {
    this.uploadedFiles = []
    this.addReview?.show()
    this.reviewForm.controls['_id'].setValue(this.reviewData[id].id);
    this.reviewForm.controls['title'].setValue(this.reviewData[id].title);
    this.reviewForm.controls['rate'].setValue(this.reviewData[id].rating);
    this.reviewForm.controls['content'].setValue(this.reviewData[id].content);
    this.uploadedFiles = this.reviewData[id].profile
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
