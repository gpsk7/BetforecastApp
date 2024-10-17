import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgIf } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RegistrationComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RaceComponent } from './components/race/race.component';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';


import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RazorpayFormComponent } from './components/razorpay-form/razorpay-form.component';
import { PaymentService } from './Services/payment.service';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LogoutComponent } from './components/logout/logout.component';
import { MatMenuModule } from '@angular/material/menu';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { AuthInterceptor } from './Services/auth.interceptor';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { AdminComponent } from './components/admin/admin.component';
import { HorseMasterComponent } from './components/horse-master/horse-master.component';
import { HorseMastereditComponent } from './components/horse-masteredit/horse-masteredit.component';
import { JockeyMasterComponent } from './components/jockey-master/jockey-master.component';
import { JockeyMastereditComponent } from './components/jockey-masteredit/jockey-masteredit.component';
import { TrainerMasterComponent } from './components/trainer-master/trainer-master.component';
import { TrainerMastereditComponent } from './components/trainer-masteredit/trainer-masteredit.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotOtpVerifyComponent } from './components/forgot-otp-verify/forgot-otp-verify.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllPaymentsComponent } from './components/all-payments/all-payments.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { PaymentAmountComponent } from './components/payment-amount/payment-amount.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ViewNoteComponent } from './components/view-note/view-note.component';
import { NumerologyComponent } from './components/numerology/numerology.component';
import { AstrologyComponent } from './components/astrology/astrology.component';
import { RaceMasterComponent } from './components/race-master/race-master.component';
import { RaceMastereditComponent } from './components/race-masteredit/race-masteredit.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { MoonMasterComponent } from './components/moon-master/moon-master.component';
import { MoonMastereditComponent } from './components/moon-masteredit/moon-masteredit.component';
import { AstrologyMasterComponent } from './components/astrology-master/astrology-master.component';
import { AstrologyMastereditComponent } from './components/astrology-masteredit/astrology-masteredit.component';
import { NatureOfTheDayMasterComponent } from './components/nature-of-the-day-master/nature-of-the-day-master.component';
import { NatureOfTheDayMastereditComponent } from './components/nature-of-the-day-masteredit/nature-of-the-day-masteredit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { InplayMasterComponent } from './components/inplay-master/inplay-master.component';
import { InplayMastereditComponent } from './components/inplay-masteredit/inplay-masteredit.component';
import { ResultsComponent } from './components/results/results.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';




export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    RaceComponent,
    PaymentDetailsComponent,
    RazorpayFormComponent,
    HeaderMenuComponent,
    FeedbackComponent,
    LogoutComponent,
    FooterComponent,
    HomeComponent,
    DetailsComponent,
    AdminComponent,
    HorseMasterComponent,
    HorseMastereditComponent,
    JockeyMasterComponent,
    JockeyMastereditComponent,
    TrainerMasterComponent,
    TrainerMastereditComponent,
    OtpVerificationComponent,
    ForgotOtpVerifyComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ProfileComponent,
    AllPaymentsComponent,
    CouponComponent,
    PaymentAmountComponent,
    DashboardComponent,
    ViewNoteComponent,
    NumerologyComponent,
    AstrologyComponent,
    RaceMasterComponent,
    RaceMastereditComponent,
    YoutubeComponent,
    MoonMasterComponent,
    MoonMastereditComponent,
    AstrologyMasterComponent,
    AstrologyMastereditComponent,
    NatureOfTheDayMasterComponent,
    NatureOfTheDayMastereditComponent,
    InplayMasterComponent,
    InplayMastereditComponent,
    ResultsComponent,
    ParentComponent,
    ChildComponent,





  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSidenavModule,
    NgIf,
    MatListModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule,
    // HttpModule
    TranslateModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatSidenavModule,
    NgChartsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,


    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],

  exports: [
    AppRoutingModule
  ],

  providers: [
    DatePipe,
    JwtHelperService, // Add JwtHelperService to providers
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
