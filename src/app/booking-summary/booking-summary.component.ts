import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';
// import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  styleUrls: ['./booking-summary.component.css']
})
export class BookingSummaryComponent implements OnInit {
  // bookingSummaryDetails:object;
  bookedId;
  bookedDate;
  bookedTime;
  doctorName;
  treatmentType;
  purpose;
  patientId;
  doctorId;

  constructor(private activatedRoute: ActivatedRoute, private hmsService: HmsService) { }

  ngOnInit(): void {
    // console.log("bookingId: "+this.router.getCurrentNavigation().extras.state.bookingId);
    // console.log(history.state.bookingId);
    let bookingId = this.activatedRoute.snapshot.paramMap.get('bookingId')
    // console.log(bookingId)

    this.hmsService.getBookingSummaryDetails(bookingId).subscribe((result) => {
      // console.log(result);
      // this.bookingSummaryDetails = result;
      // console.log(this.bookingSummaryDetails);
      // console.log(this.bookingSummaryDetails[0].bookedTime);
      
      this.bookedId=result[0].id;
      this.bookedDate=result[0].bookedDate;
      this.bookedTime = result[0].bookedTime;
      this.doctorName=result[0].doctorName;
      this.treatmentType=result[0].treatmentType;
      this.purpose=result[0].purpose;
      this.patientId=result[0].patientId;
      this.doctorId=result[0].doctorId;
    });
  }

}
