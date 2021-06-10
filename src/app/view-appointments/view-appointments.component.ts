import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';
// import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-view-appointments',
  templateUrl: './view-appointments.component.html',
  styleUrls: ['./view-appointments.component.css']
})
export class ViewAppointmentsComponent implements OnInit {
  selectedDatePicker;
  appointmentDetails;
  alert: boolean = false;
  logedInUserRole;

  constructor(private hmsService: HmsService) { }

  ngOnInit(): void {
    this.logedInUserRole = localStorage.getItem("loginedUserRole");
    let queryDate = new Date();
    let datePipe = new DatePipe('en-US');
    let formattedQueryDate = datePipe.transform(queryDate, 'dd-MM-yyyy');
    this.getAppointmentDetails(formattedQueryDate);
  }

  showDetails() {
    let queryDate;
    if (this.selectedDatePicker === undefined) {
      queryDate = new Date();
    } else {
      queryDate = new Date(this.selectedDatePicker.year, (this.selectedDatePicker.month - 1), this.selectedDatePicker.day);
    }
    let datePipe = new DatePipe('en-US');
    let formattedQueryDate = datePipe.transform(queryDate, 'dd-MM-yyyy');
    this.getAppointmentDetails(formattedQueryDate);
  }

  private getAppointmentDetails(queryDate) {
    this.hmsService.getAppointmentDetailsAPI(queryDate).subscribe((result) => {
      this.appointmentDetails = result['data'];
    });
  }

  cancelAppointment(bookingId) {
    this.hmsService.cancelAppointmentAPI(bookingId).subscribe((result) => {
      this.alert = true;
      this.showDetails();
    });
  }

  closeAlert() {
    this.alert = false;
  }
}
