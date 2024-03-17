import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// component
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LogoutComponent } from './logout/logout.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';
import { TwostepComponent } from './twostep/twostep.component';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'pass-reset',
    component: PassResetComponent,
  },
  {
    path: 'pass-change',
    component: PassChangeComponent,
  },
  {
    path: 'lockscreen',
    component: LockscreenComponent,
  },
  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'success-msg',
    component: SuccessMsgComponent,
  },
  {
    path: 'twostep',
    component: TwostepComponent,
  },
  {
    path: 'errors', loadChildren: () => import('./errors/errors.module').then(m => m.ErrorsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
