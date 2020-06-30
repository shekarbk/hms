import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HmsService } from '../hms.service';
import { AppComponent } from '../app.component';

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
      // console.log("1111: " + result);

      if (Object.keys(result).length == 0) {
        this.isLoginSuccess = false;
        this.appInstance.isNavEnable = "disabled";
        this.appInstance.isLoginNavEnable = "enabled";
      } else if (result[0].email != "" && result[0].password != "") {
        this.isLoginSuccess = true;
        this.appInstance.isNavEnable = "enabled";
        this.appInstance.isLoginNavEnable = "disabled";
        localStorage.setItem("loginedUserRole",result[0].role);
      }
      // console.log(this.isLoginSuccess);
      if (this.isLoginSuccess && result[0].role == "admin") {
        this.router.navigate(['viewAppointment']); //navigate to view appointment page
      } if (this.isLoginSuccess && result[0].role == "doctor") {
        
        this.router.navigate(['viewAppointment']); //navigate to view appointment page
      } if (this.isLoginSuccess && result[0].role == "patient") {
        this.router.navigate(['register']); //navigate to view appointment page
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
