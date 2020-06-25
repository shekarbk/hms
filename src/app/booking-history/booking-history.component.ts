import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {
  bookingDetails;
  constructor(private hmsService: HmsService) { }

  ngOnInit(): void {
    this.getBookingDetails();
  }

  getBookingDetails(){
    this.hmsService.getAllBookingDetails().subscribe((result)=>{
      // console.log(result);
      this.bookingDetails = result;
    });
  }
}
