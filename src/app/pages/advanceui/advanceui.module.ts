import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// module
import { AdvanceUiRoutingModule } from './advanceui-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

// lord-icon
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element'

import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollspyDirective } from 'src/app/scrollspy.directive';

// Swiper Slider
import { SlickCarouselModule } from 'ngx-slick-carousel';

// Simple bar
import { SimplebarAngularModule } from 'simplebar-angular';


// bootstrap component 
import { ModalModule } from 'ngx-bootstrap/modal';
import { RatingModule } from 'ngx-bootstrap/rating';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

// component

import { SweetalertComponent } from './sweetalert/sweetalert.component';
import { ScrollspyComponent } from './scrollspy/scrollspy.component';
import { HighlightComponent } from './highlight/highlight.component';
import { RatingComponent } from './rating/rating.component';
import { ScrollbarComponent } from './scrollbar/scrollbar.component';
import { SwipersComponent } from './swiper/swiper.component';

@NgModule({
  declarations: [
    SweetalertComponent,
    ScrollspyComponent,
    ScrollspyDirective,
    HighlightComponent,
    RatingComponent,
    ScrollbarComponent,
    SwipersComponent
  ],
  imports: [
    CommonModule,
    AdvanceUiRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
    ScrollToModule.forRoot(),
    RatingModule.forRoot(),
    FormsModule,
    SlickCarouselModule,
    SimplebarAngularModule,
    BsDropdownModule.forRoot(),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdvanceuiModule {

  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
