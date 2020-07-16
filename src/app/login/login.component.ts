import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HmsService } from '../hms.service';
import { AppComponent } from '../app.component';
import{ GlobalConstants } from '../../app/common/global-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginSuccess: boolean = false;
  alert: boolean = false;

  loginHms = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    loginType: new FormControl('Admin')
  });

  constructor(private hmsService: HmsService, private router: Router, private appInstance: AppComponent) { }

  ngOnInit(): void {
  }

  collectLogin() {
    // console.log("user: " + this.loginHms.value.email);
    // console.log("password: " + this.loginHms.value.password);
    // console.log("role: " + this.loginHms.value.loginType);

    this.hmsService.getLoginUserDetails(this.loginHms.value.email, this.loginHms.value.password, this.loginHms.value.loginType).subscribe((result) => {

      if (Object.keys(result).length == 0) {
        this.isLoginSuccess = false;
        this.appInstance.isNavEnable = "disabled";
        this.appInstance.isLoginNavEnable = "enabled";
        this.appInstance.isRegistrationTabEnable = "enabled";
      } else if (result[0].email != "" && result[0].password != "") {
        this.isLoginSuccess = true;
        this.appInstance.isNavEnable = "enabled";
        this.appInstance.isLoginNavEnable = "disabled";

        //store the data in the browser session
        localStorage.setItem("loginedUserRole",result[0].role);
        localStorage.setItem("logedInUserId",result[0].email);
        

        this.hmsService.getSpecificProfileDetails(result[0].email).subscribe((rst) => {
          // console.log(rst[0].id);
          localStorage.setItem("logedInUserRegistrationId",rst[0].id);
        });
      }
      // console.log(this.isLoginSuccess);
      // console.log("#### "+result[0].role);
      if (this.isLoginSuccess && result[0].role == GlobalConstants.adminRole) {
        this.router.navigate(['viewAppointment']); //navigate to view appointment page
        this.appInstance.isNavEnable = "enabled";
        this.appInstance.isRegistrationTabEnable = "enabled";
      } if (this.isLoginSuccess && result[0].role == GlobalConstants.doctorRole) {
        this.appInstance.isNavEnable = "enabled";
        this.appInstance.isRegistrationTabEnable = "disabled";
        this.router.navigate(['viewAppointment']); //navigate to view appointment page
      } if (this.isLoginSuccess && result[0].role == GlobalConstants.patientRole) {
        this.appInstance.isNavEnable = "enabled";
        this.appInstance.isRegistrationTabEnable = "disabled";
        this.router.navigate(['viewAppointment']); //navigate to view appointment page
      } else {
        this.alert = true;
      }
    });
  }

  closeAlert() {
    this.alert = false;
  }

  getImagePath(){
    return "'url(./assets/images/dr_appointment.jpg)'";
  }
}
