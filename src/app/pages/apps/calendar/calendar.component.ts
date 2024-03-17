import { Component, ViewChild } from '@angular/core';
import { UntypedFormBuilder, Validators, UntypedFormGroup } from '@angular/forms';


// Sweet Alert
import Swal from 'sweetalert2';

// Calendar option
import { CalendarOptions, EventApi, EventClickArg, EventInput } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { defaultevent, events, createEventId } from './data';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})

// calendar Component
export class CalendarComponent {

  // calendar
  calendarEvents!: EventInput[];
  editEvent: any;
  newEventDate: any;
  formEditData!: UntypedFormGroup;
  submitted = false;
  formData!: UntypedFormGroup;
  isEditMode: boolean = false;
  upcomingEvents: any;

  @ViewChild('eventModal', { static: false }) eventModal?: ModalDirective;

  constructor(private formBuilder: UntypedFormBuilder) { }

  ngOnInit(): void {

    // Validation
    this.formData = this.formBuilder.group({
      title: ['', [Validators.required]],
      category: ['', [Validators.required]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
      date: ['', Validators.required],
      start: [''],
      end: ['']
    });

    // Calender Event Data
    this.calendarEvents = events;
    this.upcomingEvents = defaultevent;
  }

  /***
 * Calender Set
 */
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin],
    headerToolbar: {
      right: 'dayGridMonth,dayGridWeek,dayGridDay,listWeek',
      center: 'title',
      left: 'prev,next today'
    },
    initialView: 'dayGridMonth',
    initialEvents: events,
    themeSystem: "bootstrap",
    timeZone: 'local',
    droppable: true,
    editable: true,
    selectable: true,
    navLinks: true,
    select: this.openModal.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventResizableFromStart: true,
  };
  currentEvents: EventApi[] = [];

  /**
   * Event add modal
   */
  openModal(events?: any) {
    this.isEditMode = false;

    setTimeout(() => {
      var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement;
      modaltitle.innerHTML = "Add Event";

      var modalbtn = document.querySelector('#btn-save-event') as HTMLAreaElement;
      modalbtn.innerHTML = "Add Event";

      document.getElementById('btn-delete-event')?.classList.add('d-none');

      (document.querySelector(".event-form") as HTMLElement).style.display = "block";
    }, 100);

    this.eventModal?.show();
    this.submitted = false;
    this.newEventDate = events;
  }

  /**
   * Event click modal show
   */
  handleEventClick(clickInfo: EventClickArg) {
    this.isEditMode = true;
    this.editEvent = clickInfo.event;
    this.eventModal?.show();

    setTimeout(() => {
      (document.querySelector(".event-details") as HTMLElement).style.display = "block";
      (document.querySelector(".event-form") as HTMLElement).style.display = "none";

      document.getElementById('btn-delete-event')?.classList.remove('d-none');

      var editbtn = document.querySelector('#edit-event-btn') as HTMLAreaElement;
      editbtn.innerHTML = 'edit';

      (document.getElementById('btn-save-event') as HTMLElement).setAttribute("hidden", "true");

      var modaltitle = document.querySelector('.modal-title') as HTMLAreaElement;
      modaltitle.innerHTML = this.editEvent.title

    }, 100);

    this.formData = this.formBuilder.group({
      title: clickInfo.event.title,
      category: clickInfo.event.classNames[0],
      location: clickInfo.event.extendedProps['location'],
      description: clickInfo.event.extendedProps['description'],
      date: clickInfo.event.start,
      start: (clickInfo.event.start ? clickInfo.event.start : ''),
      end: (clickInfo.event.end ? clickInfo.event.end : '')
    });

  }

  showeditEvent() {
    if (document.querySelector('#edit-event-btn')?.innerHTML == 'cancel') {
      this.eventModal?.hide();
    } else {
      (document.querySelector(".event-details") as HTMLElement).style.display = "none";
      (document.querySelector(".event-form") as HTMLElement).style.display = "block";
      (document.getElementById('btn-save-event') as HTMLElement).removeAttribute("hidden");
      var modalbtn = document.querySelector('#btn-save-event') as HTMLAreaElement;
      modalbtn.innerHTML = "Update Event"
      var editbtn = document.querySelector('#edit-event-btn') as HTMLAreaElement;
      editbtn.innerHTML = 'cancel'
    }
  }

  /**
   * Events bind in calander
   * @param events events
   */
  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  /**
  * Close event modal
  */
  closeEventModal() {
    this.formData = this.formBuilder.group({
      title: '',
      category: '',
      location: '',
      description: '',
      date: '',
      start: '',
      end: ''
    });
    this.eventModal?.hide();
  }

  /***
 * Model Position Set
 */
  position() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been saved',
      showConfirmButton: false,
      timer: 1000,
    });
  }

  /***
   * Model Edit Position Set
   */
  Editposition() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Event has been Updated',
      showConfirmButton: false,
      timer: 1000,
    });
  }
  modalTitle: string = '';
  saveButtonText: string = '';
  editCancelButtonText: string = 'Edit';

  /**
  * Save the event
  */
  saveEvent() {
    if (document.querySelector('#btn-save-event')?.innerHTML == 'Add Event') {
      if (this.formData.valid) {
        const className = this.formData.get('category')!.value;
        const title = this.formData.get('title')!.value;
        const location = this.formData.get('location')!.value;
        const description = this.formData.get('description')!.value
        const date = this.formData.get('date')!.value
        const starttime = this.formData.get('start')!.value;
        const endtime = this.formData.get('end')!.value;

        const start = new Date(starttime).toTimeString().split(' ')[0];
        // start.setHours((starttime.split(' ')[0]).split(':')[0]);
        // start.setMinutes((starttime.split(' ')[0]).split(':')[1]);
        const end = new Date(endtime).toTimeString().split(' ')[0];;
        // const end = new Date(mm + '-' + dd + '-' + yy);
        // end.setHours((endtime.split(' ')[0]).split(':')[0]);
        // end.setMinutes((endtime.split(' ')[0]).split(':')[1]);
        const calendarApi = this.newEventDate.view.calendar;
        calendarApi.addEvent({
          id: createEventId(),
          title,
          date,
          starttime,
          endtime,
          location,
          description,
          className: className
        });
        this.position();
        this.resetForm();
        this.eventModal?.hide();
        this.submitted = true;
      }
    } else {
      this.editEventSave()
    }
  }

  resetForm() {
    this.formData.reset({
      title: '',
      className: '',
      location: '',
      description: '',
      date: '',
      start: '',
      end: ''
    });
    this.eventModal?.hide();
  }

  /**
   * save edit event data
   */
  editEventSave() {
    this.isEditMode = true;
    const editTitle = this.formData.get('title')!.value;
    const editCategory = this.formData.get('category')!.value;
    const editdate = this.formData.get('date')!.value;
    const editstart = this.formData.get('date')!.value;
    const editend = this.formData.get('end')!.value;
    const editlocation = this.formData.get('location')!.value;
    const editdescription = this.formData.get('description')!.value;

    const editId = this.calendarEvents.findIndex(
      (x) => x.id + '' === this.editEvent.id + ''
    );

    this.editEvent.setProp('title', editTitle);
    this.editEvent.setProp('classNames', editCategory);
    this.editEvent.setProp('date', editdate);
    this.editEvent.setProp('start', editdate);
    this.editEvent.setProp('end', editend);
    this.editEvent.setProp('location', editlocation);
    this.editEvent.setProp('description', editdescription);

    this.calendarEvents[editId] = {
      // ...this.editEvent,
      allDay: false,
      title: editTitle,
      id: this.editEvent.id,
      classNames: editCategory,
      start: editstart,
    };
    this.Editposition();
    this.resetForm();
    this.eventModal?.hide();
  }

  /**
   * Delete event
   */
  deleteEventData() {
    this.editEvent.remove();
    this.formData = this.formBuilder.group({
      title: '',
      category: '',
      location: '',
      description: '',
      date: '',
      start: '',
      end: ''
    });
    this.eventModal?.hide();
  }


}
