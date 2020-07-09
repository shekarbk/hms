import { Component } from '@angular/core';
import { GlobalConstants } from '../app/common/global-constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hms';
  isNavEnable = "disabled";
  isLoginNavEnable = "enabled";
  isRegistrationTabEnable = "disabled";
  loginedUserRole;
  adminRoleType = GlobalConstants.adminRole;
  doctorRoleType = GlobalConstants.doctorRole;
  patientRoleType = GlobalConstants.patientRole;

  ngOnInit(): void {
  }

  logout() {
    this.isNavEnable = "disabled";
    this.isLoginNavEnable = "enabled";
  }

  handleMenuClickEvent() {
    this.loginedUserRole = localStorage.getItem("loginedUserRole");
    // console.log("11111 " + this.loginedUserRole);
  }
}
