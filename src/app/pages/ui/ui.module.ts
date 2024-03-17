import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// page route
import { UiRoutingModule } from './ui-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
// lord-icon
import lottie from 'lottie-web';
import { defineElement } from '@lordicon/element'
// ngx-masonry
import { NgxMasonryModule } from 'ngx-masonry';

// Simplebar
import { SimplebarAngularModule } from 'simplebar-angular';

// bootstrap component
import { AlertModule } from 'ngx-bootstrap/alert';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { PaginationModule } from 'ngx-bootstrap/pagination';

// componrnt
import { AlertsComponent } from './alerts/alerts.component';
import { ButtonComponent } from './button/button.component';
import { BadgesComponent } from './badges/badges.component';
import { ColorsComponent } from './colors/colors.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { GridComponent } from './grid/grid.component';
import { ImagesComponent } from './images/images.component';
import { TabsComponent } from './tabs/tabs.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { ModalsComponent } from './modals/modals.component';
import { OffcanvasComponent } from './offcanvas/offcanvas.component';
import { PlaceholderComponent } from './placeholder/placeholder.component';
import { ProgressComponent } from './progress/progress.component';
import { NotificationComponent } from './notification/notification.component';
import { MediaobjectComponent } from './mediaobject/mediaobject.component';
import { EmbedVideoComponent } from './embed-video/embed-video.component';
import { TypographyComponent } from './typography/typography.component';
import { ListsComponent } from './lists/lists.component';
import { LinksComponent } from './links/links.component';
import { GeneralComponent } from './general/general.component';
import { UtilitiesComponent } from './utilities/utilities.component';

@NgModule({
  declarations: [
    AlertsComponent,
    ButtonComponent,
    BadgesComponent,
    ColorsComponent,
    CardsComponent,
    CarouselComponent,
    DropdownComponent,
    GridComponent,
    ImagesComponent,
    TabsComponent,
    AccordionsComponent,
    ModalsComponent,
    OffcanvasComponent,
    PlaceholderComponent,
    ProgressComponent,
    NotificationComponent,
    MediaobjectComponent,
    EmbedVideoComponent,
    TypographyComponent,
    ListsComponent,
    LinksComponent,
    GeneralComponent,
    UtilitiesComponent
  ],
  imports: [
    CommonModule,
    UiRoutingModule,
    AlertModule,
    SharedModule,
    NgxMasonryModule,
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    PopoverModule.forRoot(),
    SimplebarAngularModule,
    ProgressbarModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class UiModule {

  constructor() {
    defineElement(lottie.loadAnimation);
  }
}
