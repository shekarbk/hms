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
  
  constructor(private hmsService: HmsService, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.logedInUserRole = localStorage.getItem("loginedUserRole");
    let queryDate = new Date();
    let formattedQueryDate = this.datePipe.transform(queryDate, 'dd-MM-yyyy');
    this.getAppointmentDetails(formattedQueryDate);
  }

  showDetails() {
    let queryDate;
    if (this.selectedDatePicker === undefined) {
      queryDate = new Date();
    } else {
      queryDate = new Date(this.selectedDatePicker.year, (this.selectedDatePicker.month - 1), this.selectedDatePicker.day);
    }
    let formattedQueryDate = this.datePipe.transform(queryDate, 'dd-MM-yyyy');
    this.getAppointmentDetails(formattedQueryDate);
  }

  // getAppointmentDetails(queryDate) {
  //   this.hmsService.getAppointmentDetails(queryDate).subscribe((result) => {
  //     this.appointmentDetails = result;
  //   });
  // }

  getAppointmentDetails(queryDate) {
    this.hmsService.getAppointmentDetailsAPI(queryDate).subscribe((result) => {      
      this.appointmentDetails = result['data'];
    });
  }

  cancelAppointment(bookingId){
    this.hmsService.cancelAppointmentAPI(bookingId).subscribe((result)=>{
      // console.log(result);
      this.alert = true;
      this.showDetails();
    });
  }

  // updateBookingDetails(bookingId){
  //   console.log("updating booking details");
  // }

  closeAlert() {
    this.alert = false;
  }
}
