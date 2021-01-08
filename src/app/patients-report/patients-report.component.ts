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
