import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';
import{ GlobalConstants } from '../../app/common/global-constants';

@Component({
  selector: 'app-doctors-report',
  templateUrl: './doctors-report.component.html',
  styleUrls: ['./doctors-report.component.css']
})
export class DoctorsReportComponent implements OnInit {
  doctorProfileDetails;
  isRegistraionDeleted = false;
  alert = false;
  loginedUserRole;
  adminRoleType = GlobalConstants.adminRole;

  constructor(private hmsService: HmsService) { }


  ngOnInit(): void {
    this.loginedUserRole = localStorage.getItem("loginedUserRole");
    this.getDoctorsDetails();
  }

  getDoctorsDetails() {
    this.hmsService.getAllProfileDetails("doctor").subscribe((result) => {
      // console.log(result);
      this.doctorProfileDetails = result;
    });
  }

  deleteProfile(id) {
    // console.log('delete profile for : ' + id);
    this.hmsService.deleteRegistrationDetails(id).subscribe((result) => {
      // console.log(result);
      this.hmsService.deleteProfile(id).subscribe((result_Profile) => {
        // console.log(result_Profile);
        this.getDoctorsDetails();
        this.isRegistraionDeleted = true;
      });
    });
  }

  closeAlert(){
    this.alert = true;
  }
}
