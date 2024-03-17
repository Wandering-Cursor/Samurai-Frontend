import { Component, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { selectcategoryData } from 'src/app/store/Learning/learning-selector';
import { addCategoryData, fetchcategoryData } from 'src/app/store/Learning/learning.action';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
  providers: [DecimalPipe]

})
export class CategoryComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  categories: any;
  files: File[] = [];
  categoryForm!: UntypedFormGroup;
  submitted = false;
  term: any;
  categorieslist: any;

  @ViewChild('addCategory', { static: false }) addCategory?: ModalDirective;

  constructor(public store: Store, private formBuilder: UntypedFormBuilder,) {
  }


  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Courses', active: true },
      { label: 'Category', active: true }
    ];

    /**
      * Form Validation
    */
    this.categoryForm = this.formBuilder.group({
      id: [''],
      name: [''],
      img: [''],
    });

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchcategoryData());
      this.store.select(selectcategoryData).subscribe((data) => {
        this.categories = data;
        this.categorieslist = data;
        this.categories = this.categorieslist.slice(0, 15);
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)
  }


  // File Upload
  public dropzoneConfig: DropzoneConfigInterface = {
    clickable: true,
    addRemoveLinks: true,
    previewsContainer: false,
  };

  uploadedFiles: any[] = [];

  // File Upload
  imageURL: any;
  onUploadSuccess(event: any) {
    setTimeout(() => {
      this.uploadedFiles.push(event[0]);
      this.categoryForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Add Category
  saveCategory() {
    if (this.categoryForm.valid) {

      this.categoryForm.controls['id'].setValue(this.categorieslist.length + 1)
      const newData = {
        color: 'info',
        course:'100',
        ...this.categoryForm.value
      }
      this.store.dispatch(addCategoryData({ newData }))


      setTimeout(() => {
        this.categoryForm.reset();
      }, 1000);
      this.addCategory?.hide()
    }
  }
  // filterdata
  filterdata() {
    if (this.term) {
      this.categories = this.categorieslist.filter((el: any) => el.name.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.categories = this.categorieslist.slice(0, 15)
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.term && this.categories.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

  // Page Changed
  pageChanged(event: any): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.categories = this.categorieslist.slice(startItem, endItem);
  }
}
