import { Component, ViewChild } from '@angular/core';
// import { EstateGridService } from './grid.service';
import { DecimalPipe } from '@angular/common';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

// import { estateList } from './data';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Options } from '@angular-slider/ngx-slider';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { addlistingGridData, deletelistingGridData, fetchlistingGridData, updatelistingGridData } from 'src/app/store/App-realestate/apprealestate.action';
import { selectData } from 'src/app/store/App-realestate/apprealestate-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [DecimalPipe]
})

// Grid Component
export class GridComponent {
  files: File[] = [];
  page: number = 1
  selectedPropertyType: string = "Villa"
  // bread crumb items
  breadCrumbItems!: Array<{}>;
  productslist: any
  propertyForm!: UntypedFormGroup;
  submitted = false;
  products: any;
  endItem: any
  // price: any = [500, 3800];

  bedroom: any;

  // Price Slider
  pricevalue: number = 100;
  minValue = 500;
  maxValue = 3800;
  options: Options = {
    floor: 0,
    ceil: 5000,
    translate: (value: number): string => {
      return '$' + value;
    },
  };
  
  @ViewChild('addProperty', { static: false }) addProperty?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteID: any;
  editData: any;

  constructor(private formBuilder: UntypedFormBuilder, public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Real Estate', active: true },
      { label: 'Listing Grid', active: true }
    ];
    setTimeout(() => {
      this.store.dispatch(fetchlistingGridData());
      this.store.select(selectData).subscribe((data) => {
        this.products = data;
        this.productslist = data;
        this.products = this.productslist.slice(0, 8)
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000);

    /**
   * Form Validation
   */
    this.propertyForm = this.formBuilder.group({
      id: [''],
      title: ['', [Validators.required]],
      type: ['', [Validators.required]],
      bedroom: ['', [Validators.required]],
      bathroom: ['', [Validators.required]],
      area: ['', [Validators.required]],
      price: ['', [Validators.required]],
      agent: ['', [Validators.required]],
      requirement: ['', [Validators.required]],
      location: ['', [Validators.required]],
      img: ['']
    });
  }

  // Hide/Show Filter
  showFilter() {
    const filterStyle = (document.getElementById("propertyFilters") as HTMLElement).style.display;
    if (filterStyle == 'none') {
      (document.getElementById("propertyFilters") as HTMLElement).style.display = 'block'
    } else {
      (document.getElementById("propertyFilters") as HTMLElement).style.display = 'none'
    }
  }

  // Add to starr
  starredproduct(id: any, event: any, star: any) {
    event.target.classList.toggle('active')
    if (star == false) {
      this.products[id].starred = true
    } else {
      this.products[id].starred = false
    }
  }

  // filter bedroom wise
  bedroomFilter(ev: any) {
    if (ev.target.value != '') {
      if (ev.target.checked == true) {
        this.products = this.productslist.filter((el: any) => {
          return el.bedroom == ev.target.value
        })
      }
    } else {
      this.products = this.productslist
    }
  }

  // filter of bathrom wise
  bathroomFilter(ev: any) {
    if (ev.target.value != '') {
      if (ev.target.checked == true) {
        this.products = this.productslist.filter((el: any) => {
          return el.bedroom == ev.target.value
        })
      }
    } else {
      this.products = this.productslist
    }
  }

  // location wise filter
  location() {
    const location = (document.getElementById("select-location") as HTMLInputElement).value
    if (location) {
      this.products = this.productslist.filter((data: any) => {
        return data.location === location
      })
    } else {
      this.products = this.productslist
    }
    this.updateNoResultDisplay()
  }

  /**
 * Range Slider Wise Data Filter
 */
  valueChange(event: number, isMinValue: boolean) {
    if (isMinValue) {
      this.minValue = event;
    } else {
      this.maxValue = event;
    }

  }

  property() {
    this.products = this.productslist.filter((data: any) => {
      if (this.selectedPropertyType === "") {
        return true
      } else {
        return data.type === this.selectedPropertyType
      }
    })
  }

  // Edit Data
  editList(id: any) {
    this.uploadedFiles = [];
    this.addProperty?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    this.editData = this.products[id]
    this.uploadedFiles.push({ 'dataURL': this.editData.img, 'name': this.editData.imgalt, 'size': 1024, });
    this.propertyForm.patchValue(this.products[id]);
  }

  // Add Property
  saveProperty() {
    if (this.propertyForm.valid) {
      if (this.propertyForm.get('id')?.value) {
        const updatedData = { color: this.editData.color, ...this.propertyForm.value };
        this.store.dispatch(updatelistingGridData({ updatedData }));
      }
      else {
        this.propertyForm.controls['id'].setValue(this.productslist.length + 1)
        const location = this.propertyForm.get('location')?.value;
        const type = this.propertyForm.get('type')?.value;
        const color = (type == 'Villa' ? type == 'Residency' ? 'danger' : 'success' : 'info')
        const newData = {
          type: type,
          color: color,
          location: location,
          ...this.propertyForm.value,
        }
        this.store.dispatch(addlistingGridData({ newData }));

      }
      this.propertyForm.reset();
      this.uploadedFiles = [];
      this.addProperty?.hide()
    }
  }
  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  confirmDelete() {
    this.store.dispatch(deletelistingGridData({ id: this.deleteID.toString()}));
    this.deleteRecordModal?.hide()
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
      this.propertyForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Page Changed
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.products = this.productslist.slice(startItem, endItem);
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.getElementById('noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;

    if (this.products.length === 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')
    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }
}
