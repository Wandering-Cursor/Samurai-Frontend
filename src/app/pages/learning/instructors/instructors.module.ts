import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Route
import { InstructorsRoutingModule } from './instructors-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Select Droup down
import { NgSelectModule } from '@ng-select/ng-select';

// FlatPicker
import { FlatpickrModule } from 'angularx-flatpickr';

// dropzone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// bootstrap component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { RatingModule } from 'ngx-bootstrap/rating';

// Component
import { ListComponent } from './list/list.component';
import { GridComponent } from './grid/grid.component';
import { OverviewComponent } from './overview/overview.component';
import { CreateComponent } from './create/create.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    ListComponent,
    GridComponent,
    OverviewComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    InstructorsRoutingModule,
    SharedModule,
    NgApexchartsModule,
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    SimplebarAngularModule,
    NgSelectModule,
    DropzoneModule,
    RatingModule,
    FlatpickrModule.forRoot()
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
})
export class InstructorsModule { }
