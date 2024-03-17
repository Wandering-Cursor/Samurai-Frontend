import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SweetalertComponent } from './sweetalert/sweetalert.component';
import { HighlightComponent } from './highlight/highlight.component';
import { ScrollspyComponent } from './scrollspy/scrollspy.component';
import { RatingComponent } from './rating/rating.component';
import { ScrollbarComponent } from './scrollbar/scrollbar.component';
import { SwipersComponent } from './swiper/swiper.component';


const routes: Routes = [
  {
    path: 'sweetalert',
    component: SweetalertComponent
  },
  {
    path: 'scrollspy',
    component: ScrollspyComponent
  },
  {
    path: 'highlight',
    component: HighlightComponent
  },
  {
    path: 'highlight',
    component: HighlightComponent
  },
  {
    path: 'ratings',
    component: RatingComponent
  },
  {
    path: 'scrollbar',
    component: ScrollbarComponent
  },
  {
    path: 'swiper',
    component: SwipersComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceUiRoutingModule { }
