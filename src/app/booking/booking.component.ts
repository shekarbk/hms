import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HmsService } from '../hms.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { GlobalConstants } from '../../app/common/global-constants';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})

@Injectable({
  providedIn: 'root',
})

export class BookingComponent implements OnInit {
  inputRegistrationId;
  patientId: number;
  patitentName: string;
  existingDiseases: string;
  tabletContent: Object[] = new Array();
  row1TimeSlot: string[] = ["9:00", "10:00", "11:00"];
  row2TimeSlot: string[] = ["8:00", "10:00", "12:00", "14:00"];
  row3TimeSlot: string[] = ["10:00", "11:00"];
  doctorId: number;
  doctorName: string;
  timeslot: string[];
  status: string;
  selectedDatePicker;
  selectedTimeSlot: any[] = new Array();
  bookedTreatmentPurpose: any[] = new Array();
  bookedDate;
  bookedTreatmentType;
  bookingConfirmationDetails;
  logedInUserRole;
  logedInUserId;
  setReadyOnlyFlag = false;
  rootAPIUrl = "http://localhost:8080/v1/hms";
  noDoctorsAvaiableFlag = false;
  errorInfoFlag = false;

  bookingHms = new FormGroup({
    registrationId: new FormControl(),
    firstName: new FormControl(),
    lastName: new FormControl(),
    sex: new FormControl(),
    age: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    address: new FormControl(),
    existingDiseases: new FormControl(),
    role: new FormControl()
  });
  constructor(private router: Router, private datePipe: DatePipe, private hmsService: HmsService, private httpInstance: HttpClient) {

  }

  ngOnInit(): void {
    this.logedInUserRole = localStorage.getItem("loginedUserRole");
    this.logedInUserId = localStorage.getItem("logedInUserId");
    if (this.logedInUserRole === GlobalConstants.adminRole) {
      this.setReadyOnlyFlag = false;
    } else if (this.logedInUserRole === GlobalConstants.patientRole) {
      this.setReadyOnlyFlag = true;
      this.inputRegistrationId = localStorage.getItem("logedInUserRegistrationId");
      this.searchRegId(this.inputRegistrationId);
    }
  }

  searchRegId(id) {
    this.hmsService.getRegistrationDetailsAPI(id).subscribe((result) => {
      if (result["status"] == GlobalConstants.SUCCESS) {
        this.patientId = result['data'].registrationId;
        this.patitentName = result['data'].firstName + " " + result['data'].lastName;
        this.existingDiseases = result['data'].existingDiseases;
      }
      else {
        this.bookingHms.reset({});
      }
    });
  }

  async handleSelectEvent1(selectedValue) {
    this.bookedTreatmentType = selectedValue;
    let gpResult;
    if (selectedValue != "" && this.selectedDatePicker != undefined) {
      gpResult = await this.getDoctorDetails(selectedValue);
      if (gpResult["status"] == GlobalConstants.SUCCESS) {
        this.errorInfoFlag = false;
        this.noDoctorsAvaiableFlag = false;
        this.appointmentBooking(gpResult);
      } else {
        this.noDoctorsAvaiableFlag = true;
        this.tabletContent = [];//empty table content
      }
    } else {
      this.tabletContent = [];//empty table content
      this.errorInfoFlag = true;
    }
  }

  async appointmentBooking(gpResult) {
    this.tabletContent = [];
    let queryDate = new Date(this.selectedDatePicker.year, (this.selectedDatePicker.month - 1), this.selectedDatePicker.day);
    this.bookedDate = this.datePipe.transform(queryDate, 'dd-MM-yyyy');
    let completeBookingObject: object = null;
    let singleRowObject: Object = null;
    let bookingMap = new Map<number, Object>();
    for (var num = 0; num < gpResult['data'].length; num++) {
      var doctorId = gpResult['data'][num].registrationId;
      var doctorName = gpResult['data'][num].firstName + " " + gpResult['data'][num].lastName;
      let slot: string[];
      let completeTimeSlot: string[] = ["9:00", "10:00", "11:00", "12:00", "13:00"];
      await this.httpInstance.get(`${this.rootAPIUrl}/booking/date/${this.bookedDate}/doctorId/${doctorId}`).toPromise().then(bookingResult => {
        if (bookingResult["status"] == GlobalConstants.SUCCESS) {
          for (var i = 0; i < bookingResult['data'].length; i++) {
            var bookedTimeSlot = bookingResult['data'][i].bookedTime;
            for (var j = 0; j < Object.keys(completeTimeSlot).length; j++) {
              if (bookedTimeSlot == completeTimeSlot[j]) {
                slot = this.removeTimeSlot(bookedTimeSlot, completeTimeSlot);
                //console.log("doctorId " + doctorId + " removeDocument " + this.completeTimeSlot);
                singleRowObject = {
                  index: num,
                  doctorId: doctorId,
                  doctorName: doctorName,
                  timeslot: slot != undefined ? slot : completeTimeSlot,
                  status: "available"
                };
                bookingMap.set(doctorId, singleRowObject);
              }
            }
          }
        } else {
          singleRowObject = {
            index: num,
            doctorId: doctorId,
            doctorName: doctorName,
            timeslot: completeTimeSlot,
            status: "available",
            treatmentFor: "",
          };
          bookingMap.set(doctorId, singleRowObject);
        }
      });
    }
    bookingMap.forEach((value: object, key: number) => {
      this.tabletContent.push(value);
    });
  }


  //remove the given element from complete list
  removeTimeSlot(givenTime, completTime) {
    completTime.forEach((item, index) => {
      if (item === givenTime) completTime.splice(index, 1);
    });
    return completTime;
  }

  private async getDoctorDetails(selectedValue) {
    var result: object = null;
    await this.httpInstance.get(`${this.rootAPIUrl}/registration/specialization/${selectedValue}`).toPromise().then(data => {
      result = data;
    });
    return result;
  }

  bookingSlot(bookingDetails) {
    let bookingObject = {
      bookedDate: this.bookedDate,
      bookedTime: this.selectedTimeSlot[bookingDetails.index],
      doctorName: bookingDetails.doctorName,
      doctorId: bookingDetails.doctorId,
      treatmentType: this.bookedTreatmentType,
      purpose: this.bookedTreatmentPurpose[bookingDetails.index],
      patientId: this.inputRegistrationId,
      patientName: this.patitentName,
      isTreatmentCompleted: "NOT_COMPLETED",
      prescription: ""
    };

    this.hmsService.saveBookingDetailsAPI(bookingObject).subscribe((result) => {
      this.router.navigate(['bookingSummary', { bookingId: result['data'].bookingId }]);
    });


  }

}
