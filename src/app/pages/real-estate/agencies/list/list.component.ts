import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { addAgenciesData, deleteAgenciesData, fetchAgenciesData, updateAgenciesData } from 'src/app/store/Agency/agency.action';
import { selectData } from 'src/app/store/Agency/agency-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DecimalPipe]
})

// List Component
export class ListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  agencies: any;
  agency: any
  agenciesForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;
  files: File[] = [];
  bedroom: any;
  agencylist: any
  searchTerm: any
  searchResults: any;

  @ViewChild('addAgencies', { static: false }) addAgencies?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteID: any;
  sortValue: any = 'Since';

  constructor(private formBuilder: UntypedFormBuilder, public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Agencies', active: true },
      { label: 'List View', active: true }
    ];

    /**
 * Form Validation
 */
    this.agenciesForm = this.formBuilder.group({
      id: [''],
      img: [''],
      since: ['', [Validators.required]],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      property: ['', [Validators.required]],
      employee: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]]
    });

    // Fetch Data
    setTimeout(() => {
      this.store.dispatch(fetchAgenciesData());
      this.store.select(selectData).subscribe((data) => {
        this.agency = data;
        this.agencylist = data;
        this.agency = cloneDeep(this.agencylist.slice(0, 10))
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
      this.agenciesForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Edit Data
  editList(id: any) {
    this.uploadedFiles = [];
    this.addAgencies?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'
    var editData = this.agency[id]
    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.imgalt, 'size': 1024, });

    this.agenciesForm.patchValue(this.agency[id]);
  }

  // Add Property
  saveAgencies() {
    if (this.agenciesForm.valid) {
      if (this.agenciesForm.get('id')?.value) {
        const updatedData = this.agenciesForm.value;
        this.store.dispatch(updateAgenciesData({ updatedData }));
      }
      else {
        this.agenciesForm.controls['id'].setValue(this.agency.length + 1)
        const newData = {
          ...this.agenciesForm.value,
        }
        this.store.dispatch(addAgenciesData({ newData }));
      }
      this.uploadedFiles = [];
      this.addAgencies?.hide();
      this.agenciesForm.reset();
    }
  }


  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }
  confirmDelete(id: any) {
    if (id) {
      this.store.dispatch(deleteAgenciesData({ id: this.deleteID.toString() }));
    }
    this.store.dispatch(deleteAgenciesData({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false;
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.masterSelected = ev.target.checked;
    this.agency.forEach((data: any) => { data.state = this.masterSelected });
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.agency.length; i++) {
      if (this.agency[i].state == true) {
        result = this.agency[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Sort Data
  direction: any = 'asc';
  sortBy(column: any, value: any) {
    this.sortValue = value;
    this.onSort(column)
  }

  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.agency]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.agency = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }

  // Page Changed
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.agency = this.agencylist.slice(startItem, endItem);
  }

  // Search Data
  performSearch(): void {
    this.searchResults = this.agencylist.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.location.toLowerCase().includes(this.searchTerm.toLowerCase())

    })
    this.agency = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay()
  }


  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement
    if (this.searchResults && this.agency.length == 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')

    }
  }
}
