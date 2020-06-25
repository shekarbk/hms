import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'hms';
  isNavEnable = "disabled";
  isLoginNavEnable = "enabled";

  logout() {
    this.isNavEnable = "disabled";
    this.isLoginNavEnable = "enabled";
  }
}
