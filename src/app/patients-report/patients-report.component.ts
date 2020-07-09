import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';
import{ GlobalConstants } from '../../app/common/global-constants';

@Component({
  selector: 'app-patients-report',
  templateUrl: './patients-report.component.html',
  styleUrls: ['./patients-report.component.css']
})
export class PatientsReportComponent implements OnInit {
  patientProfileDetails;
  isRegistraionDeleted = false;
  alert = false;
  loginedUserRole;
  adminRoleType = GlobalConstants.adminRole;

  constructor(private hmsService: HmsService) { }

  ngOnInit(): void {
    // console.log("loginedUserRole: "+localStorage.getItem("loginedUserRole"));
    this.loginedUserRole = localStorage.getItem("loginedUserRole");
    this.getPatientDetails();
  }

  getPatientDetails() {
    this.hmsService.getAllProfileDetails("patient").subscribe((result) => {
      // console.log(result);
      this.patientProfileDetails = result;
    });
  }

  deleteProfile(id) {
    // console.log('delete profile for : ' + id);
    this.hmsService.deleteRegistrationDetails(id).subscribe((result) => {
      // console.log(result);
      this.hmsService.deleteProfile(id).subscribe((result_Profile) => {
        // console.log(result_Profile);
        this.getPatientDetails();
        this.isRegistraionDeleted = true;
      });
    });
  }

  closeAlert(){
    this.alert = true;
  }
}
