import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Page Route
import { RealEstateRoutingModule } from './real-estate-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// Count To
import { CountUpModule } from 'ngx-countup';

// Flat Picker
import { FlatpickrModule } from 'angularx-flatpickr';

// Apex Chart Package
import { NgApexchartsModule } from 'ng-apexcharts';

// Range Slider
import { NgxSliderModule } from 'ngx-slider-v2';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// dropzone
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

// Leaflet Map
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// bootstrap component
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

// Component
import { GridComponent } from './grid/grid.component';
import { ListComponent } from './list/list.component';
import { MapComponent } from './map/map.component';
import { PropertyOverviewComponent } from './property-overview/property-overview.component';
import { AddPropertiesComponent } from './add-properties/add-properties.component';
import { EarningsComponent } from './earnings/earnings.component';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  url: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};

@NgModule({
  declarations: [
    GridComponent,
    ListComponent,
    MapComponent,
    PropertyOverviewComponent,
    AddPropertiesComponent,
    EarningsComponent,
  ],
  imports: [
    CommonModule,
    RealEstateRoutingModule,
    SharedModule,
    SimplebarAngularModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    CountUpModule,
    LeafletModule,
    SlickCarouselModule,
    NgApexchartsModule,
    TooltipModule,
    NgxSliderModule,
    DropzoneModule,
    FlatpickrModule.forRoot()
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class RealEstateModule { }
