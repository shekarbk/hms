import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';
import { GlobalConstants } from '../../app/common/global-constants';

@Component({
  selector: 'app-patients-report',
  templateUrl: './patients-report.component.html',
  styleUrls: ['./patients-report.component.css']
})
export class PatientsReportComponent implements OnInit {
  patientProfileDetails;
  isRegistraionDeleted = false;
  alert = false;
  logedInUserRole;
  adminRoleType = GlobalConstants.adminRole;
  logedInUserId;

  constructor(private hmsService: HmsService) { }

  ngOnInit(): void {
    this.logedInUserRole = localStorage.getItem("loginedUserRole");
    this.logedInUserId = localStorage.getItem("logedInUserId");
    this.getPatientDetails();
  }


  getPatientDetails() {
    if (this.logedInUserRole === GlobalConstants.adminRole) {
      this.hmsService.getAllRegistrationDetailsByRoleAPI(GlobalConstants.patientRole).subscribe((result) => {
        if (result["status"] === GlobalConstants.SUCCESS) {
          this.patientProfileDetails = result['data'];
        } else {
          this.patientProfileDetails = null;
        }
      });
    } else if (this.logedInUserRole === GlobalConstants.patientRole) {
      this.hmsService.getSpecificProfileDetailsAPI(this.logedInUserId).subscribe((result) => {
        if (result["status"] === GlobalConstants.SUCCESS) {
          this.patientProfileDetails = result['data'];
        } else {
          this.patientProfileDetails = null;
        }
      });
    }

  }

  // getPatientDetails() {
  //   if(this.logedInUserRole === 'admin'){
  //     this.hmsService.getAllProfileDetails("patient").subscribe((result) => {
  //       // console.log(result);
  //       this.patientProfileDetails = result;
  //     });
  //   } else if(this.logedInUserRole === 'patient'){
  //     this.hmsService.getSpecificProfileDetails(this.logedInUserId).subscribe((result) => {
  //       // console.log(result);
  //       this.patientProfileDetails = result;
  //     });
  //   }

  // }

  // deleteProfile(id) {
  //   // console.log('delete profile for : ' + id);
  //   this.hmsService.deleteRegistrationDetails(id).subscribe((result) => {
  //     // console.log(result);
  //     this.hmsService.deleteProfile(id).subscribe((result_Profile) => {
  //       // console.log(result_Profile);
  //       this.getPatientDetails();
  //       this.isRegistraionDeleted = true;
  //     });
  //   });
  // }

  deleteProfile(id) {
    this.hmsService.deleteRegistrationDetailsAPI(id).subscribe((result) => {
      this.getPatientDetails();
      this.isRegistraionDeleted = true;
    });
  }

  closeAlert() {
    this.alert = true;
  }
}
