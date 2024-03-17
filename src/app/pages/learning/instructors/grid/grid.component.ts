import { Component, ViewChild } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { addinstructorgridData, deleteinstructorgridData, deleteinstructorgridFailure, fetchinstructorgridData, updateinstructorgridData } from 'src/app/store/Learning-instructor/instructor.action';
import { selectgridData } from 'src/app/store/Learning-instructor/instructor.selector';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [DecimalPipe]
})

// Grid Component

export class GridComponent {
  term: any
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  instuctoractivity: any;
  files: File[] = [];
  deleteID: any;

  GridForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;
  instructorGrid: any
  instructors: any;
  @ViewChild('addInstructor', { static: false }) addInstructor?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  editData: any;


  constructor(private formBuilder: UntypedFormBuilder, public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Instructors', active: true },
      { label: 'Grid View', active: true }
    ];

    /**
     * Form Validation
     */
    this.GridForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      total_course: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      students: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      status: ['', [Validators.required]],
      img: ['']
    });


    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchinstructorgridData());
      this.store.select(selectgridData).subscribe((data) => {
        this.instructors = data;
        this.instructorGrid = data;
        this.instructors = cloneDeep(this.instructorGrid.slice(0, 10));
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
      this.GridForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Edit Data
  editList(id: any) {
    this.uploadedFiles = [];
    this.addInstructor?.show();
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement;
    modaltitle.innerHTML = 'Edit Product';
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement;
    modalbtn.innerHTML = 'Update';

    this.editData = this.instructors[id]

    this.uploadedFiles.push({ 'dataURL': this.editData.img, 'name': this.editData.img_alt, 'size': 1024, });

    this.GridForm.patchValue(this.instructors[id]);
  }

  // add Product
  saveGrid() {
    if (this.GridForm.valid) {
      if (this.GridForm.get('id')?.value) {
        const updatedData = {
          designation:this.editData.designation,
          rating:this.editData.rating,
          ...this.GridForm.value
        };
        this.store.dispatch(updateinstructorgridData({ updatedData }));
      }
      else {
        this.GridForm.controls['id'].setValue(this.instructors.length + 1)
        const newData = {
          designation:'Angular Devloper',
          rating:'4.3',
          ...this.GridForm.value,
        }
        this.store.dispatch(addinstructorgridData({ newData }));

      }
      this.addInstructor?.hide();

      setTimeout(() => {
        this.GridForm.reset();
      }, 2000);
      this.uploadedFiles = [];
      this.GridForm.reset();
    }
  }

  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  confirmDelete() {
    this.store.dispatch(deleteinstructorgridData({ id: this.deleteID.toString() }));
    this.deleteRecordModal?.hide()
  }

  // filterdata
  filterdata() {
    if (this.term) {
      this.instructors = this.instructorGrid.filter((el: any) => el.name.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.instructors = this.instructorGrid.slice(0, 10)
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.term && this.instructors.length === 0) {
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
    this.instructors = this.instructorGrid.slice(startItem, endItem);
  }
}
