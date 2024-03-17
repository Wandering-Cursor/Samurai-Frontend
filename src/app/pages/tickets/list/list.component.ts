import { Component, ViewChild } from '@angular/core';

// Get Modal
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { addticketlistData, deleteticketlistData, fetchsupporticketsData, fetchticketlistData, updateticketlistData } from 'src/app/store/Tickets/ticket.actions';
import { selectData, selectlistData } from 'src/app/store/Tickets/ticket-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { cloneDeep } from 'lodash';
import { assignesTickets } from 'src/app/core/data';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DecimalPipe]
})

// List component
export class ListComponent {

  // bread crumb items
  breadCrumbItems!: Array<{}>;
  deleteID: any;
  endItem: any
  ListForm!: UntypedFormGroup;
  submitted = false;
  masterSelected!: boolean;
  supportList: any;
  tickets: any;
  // assigndata: any
  assignList: any;
  term: any
  @ViewChild('addTickets', { static: false }) addTickets?: ModalDirective;
  @ViewChild('deleteRecordModal', { static: false }) deleteRecordModal?: ModalDirective;
  assignto: any = [];
  editData: any;
  alltickets: any;

  constructor(private formBuilder: UntypedFormBuilder, public store: Store,public datepipe:DatePipe) {
  }

  ngOnInit(): void {
    /**
     * BreadCrumb
     */
    this.breadCrumbItems = [
      { label: 'Support Tickets', active: true },
      { label: 'List View', active: true }
    ];

    /**
     * Form Validation
     */
    this.ListForm = this.formBuilder.group({
      id: [''],
      clientName: ['', [Validators.required]],
      ticketTitle: ['', [Validators.required]],
      createDate: ['', [Validators.required]],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    this.store.dispatch(fetchsupporticketsData());
    this.store.select(selectData).subscribe((data) => {
      this.supportList = data;
    });


    setTimeout(() => {
      this.store.dispatch(fetchticketlistData());
      this.store.select(selectlistData).subscribe((data) => {
        this.tickets = data;
        this.alltickets = data;
        this.tickets = cloneDeep(this.alltickets.slice(0, 10))
      });
      document.getElementById('elmLoader')?.classList.add('d-none')
    }, 1000)

    this.assignList = assignesTickets
  }

  // Edit Data
  editList(id: any) {
    this.addTickets?.show()
    var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement
    modaltitle.innerHTML = 'Edit Product'
    var modalbtn = document.getElementById('add-btn') as HTMLAreaElement
    modalbtn.innerHTML = 'Update';
    this.editData = this.tickets[id];
    this.assignto = this.editData.assignedto;
    this.ListForm.patchValue(this.tickets[id]);
  }

  // Add Assigne
  addAssign(id: any) {
    if (this.assignList[id].checked == '0') {
      this.assignList[id].checked = '1'
    } else {
      this.assignList[id].checked = '0'
    }
   
    this.assignto = [];
    this.assignList.forEach((element: any) => {
      if (element.checked == '1') {
        this.assignto.push(element)
      }
    });
  }

  // add Product
  saveList() {
    this.submitted = true
    if (this.ListForm.valid) {
      if (this.ListForm.get('id')?.value) {
        const updatedData = {assignedto:this.assignto,...this.ListForm.value};
        this.store.dispatch(updateticketlistData({ updatedData }));
      }
      else {
        this.ListForm.controls['id'].setValue((this.alltickets.length + 1).toString());
        const createDate = this.datepipe.transform(this.ListForm.get('createDate')?.value, "dd MMM, yyyy") || ''
        const dueDate = this.datepipe.transform(this.ListForm.get('dueDate')?.value, "dd MMM, yyyy") || ''
        this.ListForm.patchValue({ createDate: createDate,dueDate:dueDate });

        const newData = {assignedto:this.assignto,...this.ListForm.value} 
        this.store.dispatch(addticketlistData({ newData }));
      }
      this.assignto = [];
      this.ListForm.reset();
      this.addTickets?.hide()
    }
  }

  checkedValGet: any[] = [];
  // The master checkbox will check/ uncheck all items
  checkUncheckAll(ev: any) {
    this.tickets = this.tickets.map((x: { states: any }) => ({ ...x, states: ev.target.checked }));
    var checkedVal: any[] = [];
    var result;
    for (var i = 0; i < this.tickets.length; i++) {
      if (this.tickets[i].states == true) {
        result = this.tickets[i].id;
        checkedVal.push(result);
      }
    }

    this.checkedValGet = checkedVal;
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }

  // Select Checkbox value Get
  onCheckboxChange(e: any) {
    var checkedVal: any[] = [];
    var result
    for (var i = 0; i < this.tickets.length; i++) {
      if (this.tickets[i].states == true) {
        result = this.tickets[i].id;
        checkedVal.push(result);
      }
    }
    this.checkedValGet = checkedVal
    checkedVal.length > 0 ? document.getElementById("remove-actions")?.classList.remove('d-none') : document.getElementById("remove-actions")?.classList.add('d-none');
  }


  // Delete Product
  removeItem(id: any) {
    this.deleteID = id
    this.deleteRecordModal?.show()
  }

  deleteData(id: any) {
    this.deleteRecordModal?.hide();
    if (id) {
      this.store.dispatch(deleteticketlistData({ id: this.deleteID.toString() }));
    }
    this.store.dispatch(deleteticketlistData({ id: this.checkedValGet.toString() }));
    this.deleteRecordModal?.hide();
    this.masterSelected = false
  }
  // Sort Data
  direction: any = 'asc';
  onSort(column: any) {
    if (this.direction == 'asc') {
      this.direction = 'desc';
    } else {
      this.direction = 'asc';
    }
    const sortedArray = [...this.tickets]; // Create a new array
    sortedArray.sort((a, b) => {
      const res = this.compare(a[column], b[column]);
      return this.direction === 'asc' ? res : -res;
    });
    this.tickets = sortedArray;
  }
  compare(v1: string | number, v2: string | number) {
    return v1 < v2 ? -1 : v1 > v2 ? 1 : 0;
  }


  // filterdata
  filterdata() {
    if (this.term) {
      this.tickets = this.alltickets.filter((es: any) => es.ticketTitle.toLowerCase().includes(this.term.toLowerCase()))
    } else {
      this.tickets = this.alltickets.slice(0, 10);
    }
    // noResultElement
    this.updateNoResultDisplay();
  }

  // no result 
  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;

    if (this.term && this.tickets.length === 0) {
      noResultElement.classList.remove('d-none')
      paginationElement.classList.add('d-none')

    } else {
      noResultElement.classList.add('d-none')
      paginationElement.classList.remove('d-none')
    }
  }

  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    this.endItem = event.page * event.itemsPerPage;
    this.tickets = this.alltickets.slice(startItem, this.endItem);
  }
}


