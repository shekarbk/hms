import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';

@Component({
  selector: 'app-patients-report',
  templateUrl: './patients-report.component.html',
  styleUrls: ['./patients-report.component.css']
})
export class PatientsReportComponent implements OnInit {
  patientProfileDetails;

  constructor(private hmsService: HmsService) { }

  ngOnInit(): void {
    this.getPatientDetails();
  }

  getPatientDetails() {
    this.hmsService.getAllProfileDetails("patient").subscribe((result) => {
      console.log(result);
      this.patientProfileDetails = result;
    });
  }
}
