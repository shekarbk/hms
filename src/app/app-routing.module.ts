import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { LogoutComponent } from './logout/logout.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { PatientsReportComponent } from './patients-report/patients-report.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  }, {
    path: '',
    component: LoginComponent
  }, {
    path: 'booking',
    component: BookingComponent
  }, {
    path: 'appointments',
    component: AppointmentsComponent
  }, {
    path: 'history',
    component: PatientHistoryComponent
  }, {
    path: 'bookingSummary',
    component: BookingSummaryComponent
  }, {
    path: 'viewAppointment',
    component: ViewAppointmentsComponent
  }, {
    path: 'aboutus',
    component: AboutusComponent
  }, {
    path: 'contactus',
    component: ContactusComponent
  }, {
    path: 'logout',
    component: LogoutComponent
  }, {
    path: 'editAppointment/:id',
    component: EditAppointmentComponent
  }, {
    path: 'bookingHistory',
    component: BookingHistoryComponent
  }, {
    path: 'patientsReport',
    component: PatientsReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
