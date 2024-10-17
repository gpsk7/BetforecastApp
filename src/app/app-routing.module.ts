import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegistrationComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { RaceComponent } from './components/race/race.component';
import { RazorpayFormComponent } from './components/razorpay-form/razorpay-form.component';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { HeaderMenuComponent } from './components/header-menu/header-menu.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeComponent } from './components/home/home.component';
import { DetailsComponent } from './components/details/details.component';
import { authGuard } from './Services/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { HorseMasterComponent } from './components/horse-master/horse-master.component';
import { HorseMastereditComponent } from './components/horse-masteredit/horse-masteredit.component';
import { JockeyMasterComponent } from './components/jockey-master/jockey-master.component';
import { JockeyMastereditComponent } from './components/jockey-masteredit/jockey-masteredit.component';
import { TrainerMasterComponent } from './components/trainer-master/trainer-master.component';
import { TrainerMastereditComponent } from './components/trainer-masteredit/trainer-masteredit.component';
import { OtpVerificationComponent } from './otp-verification/otp-verification.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ForgotOtpVerifyComponent } from './components/forgot-otp-verify/forgot-otp-verify.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AllPaymentsComponent } from './components/all-payments/all-payments.component';
import { CouponComponent } from './components/coupon/coupon.component';
import { PaymentAmountComponent } from './components/payment-amount/payment-amount.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NumerologyComponent } from './components/numerology/numerology.component';
import { AstrologyComponent } from './components/astrology/astrology.component';
import { RaceMasterComponent } from './components/race-master/race-master.component';
import { RaceMastereditComponent } from './components/race-masteredit/race-masteredit.component';
import { YoutubeComponent } from './components/youtube/youtube.component';
import { MoonMasterComponent } from './components/moon-master/moon-master.component';
import { MoonMastereditComponent } from './components/moon-masteredit/moon-masteredit.component';
import { AstrologyMastereditComponent } from './components/astrology-masteredit/astrology-masteredit.component';
import { AstrologyMasterComponent } from './components/astrology-master/astrology-master.component';
import { NatureOfTheDayMasterComponent } from './components/nature-of-the-day-master/nature-of-the-day-master.component';
import { NatureOfTheDayMastereditComponent } from './components/nature-of-the-day-masteredit/nature-of-the-day-masteredit.component';
import { InplayMasterComponent } from './components/inplay-master/inplay-master.component';
import { InplayMastereditComponent } from './components/inplay-masteredit/inplay-masteredit.component';
import { ResultsComponent } from './components/results/results.component';
import { ParentComponent } from './components/parent/parent.component';
import { ChildComponent } from './components/child/child.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'register', component: RegistrationComponent },
  { path: 'verify-otp', component: OtpVerificationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'payment', component: RazorpayFormComponent, canActivate: [authGuard] },
  { path: 'race', component: RaceComponent, canActivate: [authGuard] },
  { path: 'paymentDetails', component: PaymentDetailsComponent, canActivate: [authGuard] },
  { path: 'headerMenu', component: HeaderMenuComponent, canActivate: [authGuard] },
  { path: 'feedback', component: FeedbackComponent, canActivate: [authGuard] },
  { path: 'logout', component:LogoutComponent, canActivate: [authGuard]},
  { path: 'home', component:HomeComponent, canActivate: [authGuard]},
  { path: 'recentPaymentDetails', component: DetailsComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminComponent},
  { path: 'profile',component:ProfileComponent},
  { path: 'dashboard', component:DashboardComponent},
  { path: '', redirectTo: '/admin', pathMatch: 'full' },

  { path: 'horseMaster', component: HorseMasterComponent},
  { path: 'horseMasteredit', component: HorseMastereditComponent},
  { path: 'jockeyMaster', component: JockeyMasterComponent},
  { path: 'jockeyMasteredit', component: JockeyMastereditComponent},
  { path: 'trainerMaster', component: TrainerMasterComponent},
  { path: 'trainerMasteredit', component: TrainerMastereditComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'forgot-otp-verify', component: ForgotOtpVerifyComponent},
  { path: 'change-password', component: ChangePasswordComponent},
  { path: 'allUsers', component: AllPaymentsComponent},
  { path: 'coupon', component: CouponComponent},
  { path: 'paymentAmount', component: PaymentAmountComponent},
  { path: 'numerology', component: NumerologyComponent},
  { path: 'astrology', component: AstrologyComponent},
  { path: 'raceMaster', component: RaceMasterComponent},
  { path: 'raceMasterEdit', component: RaceMastereditComponent},
  { path: 'yt', component: YoutubeComponent},
  { path: 'moonMaster', component: MoonMasterComponent},
  { path: 'moonMasterEdit', component: MoonMastereditComponent},
  { path: 'astrologyMaster', component: AstrologyMasterComponent},
  { path: 'astrologyMasterEdit', component: AstrologyMastereditComponent},
  { path: 'natureoftheday', component: NatureOfTheDayMasterComponent},
  { path: 'natureofthedayEdit', component: NatureOfTheDayMastereditComponent},
  { path: 'inplayMaster', component: InplayMasterComponent},
  { path: 'inplayMasterEdit', component: InplayMastereditComponent},
  { path: 'result', component: ResultsComponent},
  {path: 'parent', component:ParentComponent},
  {path: 'child', component:ChildComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
