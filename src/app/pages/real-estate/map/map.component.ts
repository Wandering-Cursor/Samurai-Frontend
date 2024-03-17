import { DecimalPipe } from '@angular/common';
import { Component, ViewChild, ViewChildren } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
// leaflet map
import { latLng, tileLayer, circle, polygon, marker, icon, Layer } from 'leaflet';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { addlistingGridData, deletelistingGridData, fetchlistingGridData, updatelistingGridData } from 'src/app/store/App-realestate/apprealestate.action';
import { selectData } from 'src/app/store/App-realestate/apprealestate-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  providers: [DecimalPipe]
})

// Map Component
export class MapComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  propertyForm!: UntypedFormGroup;
  submitted = false;
  maps: any
  maplist: any;
  masterSelected!: boolean;
  term: any
  bedroom: any;
  files: File[] = [];
  searchResults: any
  @ViewChild('addProperty', { static: false }) addProperty?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteID: any;

  constructor(private formBuilder: UntypedFormBuilder, public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Real Estate', active: true },
      { label: 'Listing Map', active: true }
    ];

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
      location: ['', [Validators.required]],
      img: ['']
    });


    setTimeout(() => {
      // Fetch Data
      this.store.dispatch(fetchlistingGridData());
      this.store.select(selectData).subscribe((data) => {
        this.maps = data;
        this.maplist = data;
        this.maps = this.maplist.slice(0, 3)
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
      this.propertyForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // filter data
  searchList() {
    if (this.term) {
      this.maps = this.maplist.filter((data: any) =>
        data.title.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.maps = this.maplist.slice(0, 3)
    }
  }
  // select apartment type
  selectstatus() {
    const status = (document.getElementById('idType') as HTMLInputElement).value
    if (status) {
      this.maps = this.maplist.filter((item: any) => { return status == item.type })
    }
  }

  /**
 * Basic Maps
 */
  options = {
    layers: [
      tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGhlbWVzYnJhbmQiLCJhIjoiY2xmbmc3bTV4MGw1ejNzbnJqOWpubzhnciJ9.DNkdZVKLnQ6I9NOz7EED-w",
        {
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        }
      )
    ],
    zoom: 10,
    center: latLng(39.73, -104.99)
  };
  GroupsLayers = [
    marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
    marker([39.63, -105.09]).bindPopup('This is Littleton, CO.'),
    marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
    marker([39.77, -105.01]).bindPopup('This is Denver, CO.'),
    marker([39.90, -105.03]).bindPopup('This is Denver, CO.'),
    marker([39.96, -105.04]).bindPopup('This is Denver, CO.'),
    marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
    marker([39.70, -104.9]).bindPopup('This is Aurora, CO.'),
    marker([39.77, -105.23]).bindPopup("This is Golden, CO."),
    marker([39.80, -105.01]).bindPopup("This is Golden, CO."),
    marker([39.95, -105.09]).bindPopup("This is Golden, CO.")
  ];


  // Edit Data
  editList(id: any) {
    this.uploadedFiles = [];
    this.addProperty?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update'

    var editData = this.maps[id]
    this.uploadedFiles.push({ 'dataURL': editData.img, 'name': editData.imgalt, 'size': 1024, });
    this.propertyForm.patchValue(this.maps[id]);
  }

  // Add Property
  saveProperty() {
    if (this.propertyForm.valid) {
      if (this.propertyForm.get('id')?.value) {
        const updatedData = this.propertyForm.value;
        this.store.dispatch(updatelistingGridData({ updatedData }));
      }
      else {
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
      this.uploadedFiles = [];
      this.propertyForm.reset();
      this.addProperty?.hide()
    }
  }

  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  confirmDelete() {
    this.store.dispatch(deletelistingGridData({ id: this.deleteID.toString() }));
    this.deleteRecordModal?.hide()
  }

  // Page Changed
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.maps = this.maplist.slice(startItem, endItem);
  }
}
