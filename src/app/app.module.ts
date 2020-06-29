import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { BookingComponent } from './booking/booking.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { PatientHistoryComponent } from './patient-history/patient-history.component';
import { LogoutComponent } from './logout/logout.component';
import { BookingConfirmationComponent } from './booking-confirmation/booking-confirmation.component';
import { BookingSummaryComponent } from './booking-summary/booking-summary.component';
import { ViewAppointmentsComponent } from './view-appointments/view-appointments.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { BookingHistoryComponent } from './booking-history/booking-history.component';
import { PatientsReportComponent } from './patients-report/patients-report.component';
import { DoctorsReportComponent } from './doctors-report/doctors-report.component';
import { EditRegistrationComponent } from './edit-registration/edit-registration.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    BookingComponent,
    AppointmentsComponent,
    PatientHistoryComponent,
    LogoutComponent,
    BookingConfirmationComponent,
    BookingSummaryComponent,
    ViewAppointmentsComponent,
    AboutusComponent,
    ContactusComponent,
    EditAppointmentComponent,
    BookingHistoryComponent,
    PatientsReportComponent,
    DoctorsReportComponent,
    EditRegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
