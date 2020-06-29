import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';

@Component({
  selector: 'app-doctors-report',
  templateUrl: './doctors-report.component.html',
  styleUrls: ['./doctors-report.component.css']
})
export class DoctorsReportComponent implements OnInit {
  doctorProfileDetails;

  constructor(private hmsService: HmsService) { }


  ngOnInit(): void {
    this.getDoctorsDetails();
  }

  getDoctorsDetails() {
    this.hmsService.getAllProfileDetails("doctor").subscribe((result) => {
      console.log(result);
      this.doctorProfileDetails = result;
    });
  }
}
