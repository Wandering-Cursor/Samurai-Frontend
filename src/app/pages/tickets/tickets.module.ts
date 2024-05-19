import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Route
import { TicketsRoutingModule } from './tickets-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Count To
import { CountUpModule } from 'ngx-countup';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// bootstrap component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
// Component
import { ListComponent } from './list/list.component';
import { OverviewComponent } from './overview/overview.component';

import { QuillModule } from 'ngx-quill';
@NgModule({
  declarations: [
    ListComponent,
    OverviewComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    SharedModule,
    CountUpModule,
    PaginationModule,
    ModalModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    ReactiveFormsModule,
    SimplebarAngularModule,
    FlatpickrModule.forRoot(),
    TooltipModule,
    QuillModule.forRoot()
  ],
  providers:[DatePipe]
})
export class TicketsModule { }
