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
    let loginRequestData = {
      email: this.loginHms.value.email,
      password: this.loginHms.value.password,
      role: this.loginHms.value.loginType
    };

    this.hmsService.getLoginUserDetailsAPI(loginRequestData).subscribe((result) => {          
      if(result["status"] == GlobalConstants.SUCCESS){
        this.isLoginSuccess = true;
        this.appInstance.isNavEnable = "enabled";
        this.appInstance.isLoginNavEnable = "disabled";

        //store the data in the browser session
        localStorage.setItem("loginedUserRole",this.loginHms.value.loginType);
        localStorage.setItem("logedInUserId",this.loginHms.value.email);

        this.hmsService.getSpecificProfileDetailsAPI(this.loginHms.value.email).subscribe((rst) => {
          localStorage.setItem("logedInUserRegistrationId",rst["data"][0].registrationId);
        });

        if (loginRequestData.role == GlobalConstants.adminRole) {
          this.router.navigate(['viewAppointment']); //navigate to view appointment page
          this.appInstance.isNavEnable = "enabled";
          this.appInstance.isRegistrationTabEnable = "enabled";
        }else if (loginRequestData.role == GlobalConstants.doctorRole) {
          this.appInstance.isNavEnable = "enabled";
          this.appInstance.isRegistrationTabEnable = "disabled";
          this.router.navigate(['viewAppointment']); //navigate to view appointment page
        }else if (loginRequestData.role == GlobalConstants.patientRole) {
          this.appInstance.isNavEnable = "enabled";
          this.appInstance.isRegistrationTabEnable = "disabled";
          this.router.navigate(['viewAppointment']); //navigate to view appointment page
        } else {
          this.alert = true;
        }
      } else {
        this.isLoginSuccess = false;
        this.appInstance.isNavEnable = "disabled";
        this.appInstance.isLoginNavEnable = "enabled";
        this.appInstance.isRegistrationTabEnable = "enabled";
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
