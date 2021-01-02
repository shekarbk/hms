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
    this.hmsService.getAllRegistrationDetailsByRoleAPI(GlobalConstants.doctorRole).subscribe((result) => {
      if(result["status"] === GlobalConstants.SUCCESS){
        this.doctorProfileDetails = result['data'];
      } else {
        this.doctorProfileDetails = null;
      }      
    });
  }

  deleteProfile(id) {
    // console.log('delete profile for : ' + id);
    this.hmsService.deleteRegistrationDetailsAPI(id).subscribe((result) => {
      // console.log(result);
      this.getDoctorsDetails();
      this.isRegistraionDeleted = true;
    });
  }

  // deleteProfile(id) {
  //   // console.log('delete profile for : ' + id);
  //   this.hmsService.deleteRegistrationDetails(id).subscribe((result) => {
  //     // console.log(result);
  //     this.hmsService.deleteProfile(id).subscribe((result_Profile) => {
  //       // console.log(result_Profile);
  //       this.getDoctorsDetails();
  //       this.isRegistraionDeleted = true;
  //     });
  //   });
  // }

  closeAlert(){
    this.alert = true;
  }
}
