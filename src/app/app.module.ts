import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// auth
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// Page Route
import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';
import { ToastrModule } from 'ngx-toastr';

// Laguage
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
// component
import { AppComponent } from './app.component';
import { AuthlayoutComponent } from './authlayout/authlayout.component';
import { environment } from 'src/environments/environment';
import { AnalyticsEffects } from './store/Analytics/analytics.effects';
import { rootReducer } from './store';
import { fakebackendInterceptor } from './core/helpers/fake-backend';
import { ErrorInterceptor } from './core/helpers/error.interceptor';
import { JwtInterceptor } from './core/helpers/jwt.interceptor';
import { CRMEffects } from './store/CRM/crm.effects';
import { ECoReducer } from './store/Ecommerce/ecommerce.reducer';
import { ECoEffects } from './store/Ecommerce/ecommerce.effects';
import { LearningEffects } from './store/Learning/learning.effects';
import { RealEffects } from './store/RealEstate/realEstate.effects';
import { AppRealestateEffects } from './store/App-realestate/apprealestate.effects';
import { AgentEffects } from './store/Agent/agent.effects';
import { AgenciesEffects } from './store/Agency/agency.effects';
import { TicketEffects } from './store/Tickets/ticket.effects';
import { ChatEffects } from './store/chat/chat.effects';
import { ProductEffects } from './store/Product/product.effect';
import { InvoiceEffects } from './store/Invoices/invoices.effects';
import { AuthenticationEffects } from './store/Authentication/authentication.effects';
import { initFirebaseBackend } from './authUtils';
import { SellerEffects } from './store/Seller/seller.effects';
import { OrdersEffects } from './store/Orders/order.effects';
import { InstructorEffects } from './store/Learning-instructor/instructor.effects';
import { CustomerEffects } from './store/Customer/customer.effects';
import { studentsEffects } from './store/students/student.effcts';
import { CourcesEffects } from './store/Learning-cources/cources.effect';

export function createTranslateLoader(http: HttpClient): any {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}
if (environment.defaultauth === 'firebase') {
  initFirebaseBackend(environment.firebaseConfig);
} else {
  fakebackendInterceptor;
}

@NgModule({
  declarations: [
    AppComponent,
    AuthlayoutComponent
  ],
  imports: [
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    StoreModule.forRoot(rootReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    EffectsModule.forRoot([
      AnalyticsEffects,
      CRMEffects,
      ECoEffects,
      LearningEffects,
      RealEffects,
      AppRealestateEffects,
      AgentEffects,
      AgenciesEffects,
      TicketEffects,
      ChatEffects,
      ProductEffects,
      InvoiceEffects,
      AuthenticationEffects,
      SellerEffects,
      OrdersEffects,
      InstructorEffects,
      CustomerEffects,
      studentsEffects,
      CourcesEffects,
      InstructorEffects
    ]),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LayoutsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: fakebackendInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
