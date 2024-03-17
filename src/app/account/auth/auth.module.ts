import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// page routing
import { AuthRoutingModule } from './auth-routing.module';
import { ErrorsModule } from './errors/errors.module';

// otp module
import { NgOtpInputModule } from 'ng-otp-input';

// Component
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { PassResetComponent } from './pass-reset/pass-reset.component';
import { PassChangeComponent } from './pass-change/pass-change.component';
import { LockscreenComponent } from './lockscreen/lockscreen.component';
import { LogoutComponent } from './logout/logout.component';
import { SuccessMsgComponent } from './success-msg/success-msg.component';
import { TwostepComponent } from './twostep/twostep.component';

@NgModule({
  declarations: [
    SigninComponent,
    SignupComponent,
    PassResetComponent,
    PassChangeComponent,
    LockscreenComponent,
    LogoutComponent,
    SuccessMsgComponent,
    TwostepComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ErrorsModule,
    NgOtpInputModule
  ]
})
export class AuthModule { }
