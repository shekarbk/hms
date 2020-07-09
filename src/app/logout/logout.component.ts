import { Component, OnInit } from '@angular/core';
import { empty } from 'rxjs';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // console.log("logout clicked");
    this.clearSession();
  }

  clearSession() {
    localStorage.setItem("loginedUserRole", "");
  }
}
