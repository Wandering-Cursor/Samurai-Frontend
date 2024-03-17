import { Component, ViewChild } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { agentlistdata } from '../list/data';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Store } from '@ngrx/store';
import { addagentData, deleteagentData, fetchagentData, updateagentData } from 'src/app/store/Agent/agent.action';
import { selectagentData } from 'src/app/store/Agent/agent-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [DecimalPipe]
})

// Grid Component
export class GridComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;

  agents: any;
  files: File[] = [];
  agentForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;
  agentlist: any
  bedroom: any;
  searchTerm!: string

  @ViewChild('addAgent', { static: false }) addAgent?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  deleteID: any;
  editData: any;

  constructor(private formBuilder: UntypedFormBuilder, private datePipe: DatePipe, public store: Store) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Agents', active: true },
      { label: 'Agent Grid', active: true }
    ];

    /**
 * Form Validation
 */
    this.agentForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      status: ['', [Validators.required]],
      location: ['', [Validators.required]],
      img: ['']
    });


    // store data
    setTimeout(() => {
      this.store.dispatch(fetchagentData());
      this.store.select(selectagentData).subscribe((data) => {
        this.agents = data;
        this.agentlist = data;
        this.agents = this.agentlist.slice(0, 10)
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
      this.agentForm.controls['img'].setValue(event[0].dataURL);
    }, 0);
  }

  // File Remove
  removeFile(event: any) {
    this.uploadedFiles.splice(this.uploadedFiles.indexOf(event), 1);
  }

  // Edit List
  editList(id: any) {
    this.uploadedFiles = [];
    this.addAgent?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update';
    this.editData = this.agentlist[id];
    this.uploadedFiles.push({ 'dataURL': this.agentlist[id].img, 'name': this.agentlist[id].imgalt, 'size': 1024, });

    this.agentForm.patchValue(this.agentlist[id])
  }


  // Add Property
  saveProperty() {
    if (this.agentForm.valid) {
      if (this.agentForm.get('id')?.value) {
        const updatedData = { new: this.editData.new, ...this.agentForm.value };
        this.store.dispatch(updateagentData({ updatedData }));
      }
      else {
        this.agentForm.controls['id'].setValue(this.agentlist.length + 1)
        const newData = this.agentForm.value;
        this.store.dispatch(addagentData({ newData }));
      }
    }
    this.addAgent?.hide()
    this.uploadedFiles = [];
    this.agentForm.reset();
    this.submitted = true
  }


  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  confirmDelete() {
    this.store.dispatch(deleteagentData({ id: this.deleteID.toString() }))
    this.deleteRecordModal?.hide()
  }

  // Page Changed
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.agents = this.agentlist.slice(startItem, endItem);
  }

  selectstatus() {
    const status = (document.getElementById("status-input") as HTMLInputElement).value
    if (status) {
      this.agents = this.agentlist.filter((data: any) => {
        return data.status == status
      })
    }
    else {
      this.agents = this.agentlist.slice(0, 10);
    }
  }
  searchResults: any;
  // Search Data
  performSearch(): void {
    this.searchResults = this.agentlist.filter((item: any) => {
      return item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.email.toLowerCase().includes(this.searchTerm.toLowerCase())
        || item.location.toLowerCase().includes(this.searchTerm.toLowerCase())

    })
    this.agents = this.searchResults.slice(0, 10);
    this.updateNoResultDisplay()
  }


  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.getElementById('noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement


    if (this.searchResults && this.agents.length == 0) {
      noResultElement.style.display = 'block';
      paginationElement.classList.add('d-none')

    } else {
      noResultElement.style.display = 'none';
      paginationElement.classList.remove('d-none')
    }
  }

}
