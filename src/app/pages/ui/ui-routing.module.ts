import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// component
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


const routes: Routes = [
  {
    path: 'alerts',
    component: AlertsComponent
  },
  {
    path: 'button',
    component: ButtonComponent
  },
  {
    path: 'badges',
    component: BadgesComponent
  },
  {
    path: 'colors',
    component: ColorsComponent
  },
  {
    path: 'cards',
    component: CardsComponent
  },
  {
    path: 'carousel',
    component: CarouselComponent
  },
  {
    path: 'dropdown',
    component: DropdownComponent
  },
  {
    path: 'grid',
    component: GridComponent
  },
  {
    path: 'images',
    component: ImagesComponent
  },
  {
    path: 'tabs',
    component: TabsComponent
  },
  {
    path: 'accordion',
    component: AccordionsComponent
  },
  {
    path: 'modal',
    component: ModalsComponent
  },
  {
    path: 'offcanvas',
    component: OffcanvasComponent
  },
  {
    path: 'placeholder',
    component: PlaceholderComponent
  },
  {
    path: 'progress',
    component: ProgressComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'media',
    component: MediaobjectComponent
  },
  {
    path: 'embed-video',
    component: EmbedVideoComponent
  },
  {
    path: 'typography',
    component: TypographyComponent
  },
  {
    path: 'lists',
    component: ListsComponent
  },
  {
    path: 'links',
    component: LinksComponent
  },
  {
    path: 'general',
    component: GeneralComponent
  },
  {
    path: 'utility',
    component: UtilitiesComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiRoutingModule { }
