import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-booking-confirmation',
  templateUrl: './booking-confirmation.component.html',
  styleUrls: ['./booking-confirmation.component.css']
})

@Injectable({
  providedIn: 'root',
})
export class BookingConfirmationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }

}
