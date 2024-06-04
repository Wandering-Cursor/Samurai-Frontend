import { Component, ViewChild } from '@angular/core';

// Get Modal
import { FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Observable, forkJoin, switchMap } from 'rxjs';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Store } from '@ngrx/store';
import { addticketlistData, deleteticketlistData, fetchsupporticketsData, fetchticketlistData, updateticketlistData } from 'src/app/store/Tickets/ticket.actions';
import { selectData, selectlistData } from 'src/app/store/Tickets/ticket-selector';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { cloneDeep } from 'lodash';
import { assignesTickets } from 'src/app/core/data';
import { restApiService } from 'src/app/core/services/rest-api.service';
import { Project } from 'src/app/interfaces/api-interfaces';
import { SupportTicket, supporttickets } from 'src/app/core/data/ticket';
import { Router } from '@angular/router';
import { PaginationParams } from '../../../interfaces/api-interfaces';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  providers: [DecimalPipe]
})

// List component
export class ListComponent {
  title = '';

  project: Project = {
    created_at: '',
    updated_at: '',
    name: '',
    description: '',
    faculty_id: '',
    project_id: '',
    tasks: [],
    account_links: [],
    tasks_count: 0,
    _links: {
      self: { href: '' },
      tasks: { href: '' }
    },
    tasks_count_by_status: {
      open: 0,
      resubmit: 0,
      in_progress: 0,
      in_review: 0,
      done: 0
    }
  };

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
  tasksMeta: {
    total: number;
    page: number;
    page_size: number;
    total_pages: number;
  } = { total: 0, page: 0, page_size: 0, total_pages: 0 };
  tasks: any[] = [];
  originalTasks: any[] = [];
  myGroup!: FormGroup;
  itemsPerPage = 10;

  constructor(private formBuilder: FormBuilder, public store: Store, public datepipe: DatePipe, public apiService: restApiService, private router: Router) {
  }

  supportTickets: SupportTicket[] = [
    {
      id: 1,
      imgBg: 'info',
      img: 'bx ph-ticket',
      iconColor: 'success',
      icon: 'ri-arrow-right-up-line',
      num: '',
      count: 0,
      title: 'Відкриті задачі' // Open Tasks
    },
    {
      id: 2,
      imgBg: 'info',
      img: 'bx ph-pen',
      iconColor: 'danger',
      icon: 'ri-arrow-right-down-line',
      num: '',
      count: 0,
      title: 'Задачі в роботі' // Tasks in Progress
    },
    {
      id: 3,
      imgBg: 'warning',
      img: 'bx ph-eye',
      iconColor: 'danger',
      icon: 'ri-arrow-right-down-line',
      num: '',
      count: 0,
      title: 'Задач на перевірці' // Tasks in Review
    },
    {
      id: 4,
      imgBg: 'warning',
      img: 'bx bx-time',
      iconColor: 'danger',
      icon: 'ri-arrow-right-down-line',
      num: '',
      count: 0,
      title: 'Задач на доперевірці' // Tasks to Resubmit
    },
    {
      id: 5,
      imgBg: 'success',
      img: 'bx bx-check-square',
      iconColor: 'success',
      icon: 'ri-arrow-right-up-line',
      num: '',
      count: 0,
      title: 'Задач зроблено' // Tasks Done
    }
  ];

  ngOnInit(): void {
    this.initializeForm();
    this.apiService.getCurrentProjects().subscribe((response: any) => {
      this.project = response;
      this.updateSupportTickets(response.tasks_count_by_status);
      this.fetchTickets(1, this.itemsPerPage);
    });

  }

  fetchTickets(page: number, page_size: number) {
    this.apiService.getProjectTasks(this.project.project_id, { page: page, page_size: page_size }).subscribe(
      (response: any) => {
        this.originalTasks = response.content;
        this.tasks = response.content;
        this.tasksMeta = response.meta;
      }
    );
  }

  updateSupportTickets(tasksCountByStatus: any): void {
    this.supportTickets = this.supportTickets.map(ticket => {
      switch (ticket.title) {
        case 'Відкриті задачі':
          ticket.count = tasksCountByStatus.open || 0;
          break;
        case 'Задачі в роботі':
          ticket.count = tasksCountByStatus.in_progress || 0;
          break;
        case 'Задач на перевірці':
          ticket.count = tasksCountByStatus.in_review || 0;
          break;
        case 'Задач на доперевірці':
          ticket.count = tasksCountByStatus.resubmit || 0;
          break;
        case 'Задач зроблено':
          ticket.count = tasksCountByStatus.done || 0;
          break;
      }
      return ticket;
    });
  }

  viewTaskDetails(taskId: string) {
    this.router.navigate(['/overview', taskId]);
  }

  initializeForm() {
    this.ListForm = this.formBuilder.group({
      clientName: ['', Validators.required],
      ticketTitle: ['', Validators.required],
      createDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      priority: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  filterdata() {
    if (this.term) {
      this.tasks = this.originalTasks.filter(task =>
        task.name.toLowerCase().includes(this.term.toLowerCase()) ||
        task.description.toLowerCase().includes(this.term.toLowerCase()) ||
        task.state.toLowerCase().includes(this.term.toLowerCase())
      );
    } else {
      this.tasks = [...this.originalTasks]; // Reset to original list when search term is cleared
    }
    this.updateNoResultDisplay();
  }

  updateNoResultDisplay() {
    const noResultElement = document.querySelector('.noresult') as HTMLElement;
    const paginationElement = document.getElementById('pagination-element') as HTMLElement;

    if (this.term && this.tasks.length === 0) {
      noResultElement.classList.remove('d-none');
      paginationElement.classList.add('d-none');
    } else {
      noResultElement.classList.add('d-none');
      paginationElement.classList.remove('d-none');
    }
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
        const updatedData = { assignedto: this.assignto, ...this.ListForm.value };
        this.store.dispatch(updateticketlistData({ updatedData }));
      }
      else {
        this.ListForm.controls['id'].setValue((this.alltickets.length + 1).toString());
        const createDate = this.datepipe.transform(this.ListForm.get('createDate')?.value, "dd MMM, yyyy") || ''
        const dueDate = this.datepipe.transform(this.ListForm.get('dueDate')?.value, "dd MMM, yyyy") || ''
        this.ListForm.patchValue({ createDate: createDate, dueDate: dueDate });

        const newData = { assignedto: this.assignto, ...this.ListForm.value }
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


  // pagechanged
  pageChanged(event: PageChangedEvent): void {
    this.fetchTickets(event.page, event.itemsPerPage);
  }
}