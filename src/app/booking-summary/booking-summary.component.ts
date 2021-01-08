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
    let bookingId = this.activatedRoute.snapshot.paramMap.get('bookingId')
    this.hmsService.getBookingSummaryDetailsAPI(bookingId).subscribe((result) => {
      this.bookedId = result['data'].bookingId;
      this.bookedDate = result['data'].bookedDate;
      this.bookedTime = result['data'].bookedTime;
      this.doctorName = result['data'].doctorName;
      this.treatmentType = result['data'].treatmentType;
      this.purpose = result['data'].purpose;
      this.patientId = result['data'].patientId;
      this.doctorId = result['data'].doctorId;
    });

  }

}
