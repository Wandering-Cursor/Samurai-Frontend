import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// module
import { MapsRoutingModule } from './maps-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// Google Map
import { GoogleMapsModule } from '@angular/google-maps';
// Leaflet map
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

// component
import { GoogleComponent } from './google/google.component';
import { LeafletComponent } from './leaflet/leaflet.component';
import { VectorComponent } from './vector/vector.component';


@NgModule({
  declarations: [
    GoogleComponent,
    LeafletComponent,
    VectorComponent
  ],
  imports: [
    CommonModule,
    MapsRoutingModule,
    SharedModule,
    LeafletModule,
    GoogleMapsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MapsModule { }
