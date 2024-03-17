import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Route
import { AppsRoutingModule } from './apps-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Emoji Picker
import { PickerModule } from '@ctrl/ngx-emoji-mart';

// datepickr
import { FlatpickrModule } from 'angularx-flatpickr';

// bootstrap component
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// count to
import { CountUpModule } from 'ngx-countup';

// Calendar package
import { FullCalendarModule } from '@fullcalendar/angular';

// Leaflet map
import { LeafletModule } from '@asymmetrik/ngx-leaflet';


// Ck Editer
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// chart
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';

// dropzone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Component
import { CalendarComponent } from './calendar/calendar.component';

import { ChatComponent } from './chat/chat.component';
import { EmailComponent } from './email/email.component';
import { FileManagerComponent } from './file-manager/file-manager.component';
import { WidgetsComponent } from './widgets/widgets.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    CalendarComponent,
    ChatComponent,
    EmailComponent,
    FileManagerComponent,
    WidgetsComponent,],
  imports: [
    CommonModule,
    AppsRoutingModule,
    FullCalendarModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    SimplebarAngularModule,
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    TooltipModule.forRoot(),
    CountUpModule,
    ProgressbarModule,
    NgApexchartsModule,
    PickerModule,
    TabsModule.forRoot(),
    SharedModule,
    LeafletModule,
    PaginationModule.forRoot(),
    NgxEchartsModule.forRoot({ echarts }),
    CKEditorModule,
    DropzoneModule,
    FlatpickrModule.forRoot(),
  ],

  providers: [
    DatePipe,
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],

})
export class AppsModule { }
