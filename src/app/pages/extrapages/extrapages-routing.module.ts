import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component pages
import { StarterComponent } from "./starter/starter.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { FaqsComponent } from "./faqs/faqs.component";
import { PricingComponent } from "./pricing/pricing.component";
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ContactsComponent } from './contacts/contacts.component';
import { TermConditionsComponent } from './term-conditions/term-conditions.component';

const routes: Routes = [
  {
    path: 'starter',
    component: StarterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'profile-settings',
    component: ProfileSettingsComponent
  },
  {
    path: 'contacts',
    component: ContactsComponent
  },
  {
    path: 'timeline',
    component: TimelineComponent
  },
  {
    path: 'faqs',
    component: FaqsComponent
  },
  {
    path: 'pricing',
    component: PricingComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'term-conditions',
    component: TermConditionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExtraPagesRoutingModule { }
