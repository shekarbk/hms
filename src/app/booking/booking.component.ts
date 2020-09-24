import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HmsService } from '../hms.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
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
  // completeTimeSlot: string[] = ["9:00", "10:00", "11:00", "12:00", "13:00"];
  constructor(private router: Router, private datePipe: DatePipe, private hmsService: HmsService, private httpInstance: HttpClient) {

  }

  ngOnInit(): void {
    this.logedInUserRole = localStorage.getItem("loginedUserRole");
    this.logedInUserId = localStorage.getItem("logedInUserId");
    if(this.logedInUserRole === 'admin'){
      this.setReadyOnlyFlag = false;
    } else if(this.logedInUserRole === 'patient'){
      this.setReadyOnlyFlag = true;
      // console.log("regId: "+localStorage.getItem("logedInUserRegistrationId"));
      this.inputRegistrationId = localStorage.getItem("logedInUserRegistrationId");
    }
  }

  searchRegId(id) {
    // console.log(this.tabletContent);
    this.hmsService.getRegistrationDetails(id).subscribe((result) => {
      // console.log(result);
      if (Object.keys(result).length != 0) {
        this.patientId = result[0]['id'];
        this.patitentName = result[0]['firstName'] + " " + result[0]['lastName'];
        this.existingDiseases = result[0]['existingDiseases'];
      } else {
        this.bookingHms.reset({});
      }
    });
  }

  async handleSelectEvent1(selectedValue) {
    this.bookedTreatmentType = selectedValue;
    let gpResult = await this.getDoctorDetails(selectedValue);
    this.tabletContent = [];
    // console.log(this.selectedDatePicker);
    let queryDate = new Date(this.selectedDatePicker.year, (this.selectedDatePicker.month - 1), this.selectedDatePicker.day);
    this.bookedDate = this.datePipe.transform(queryDate, 'dd/MM/yyyy');
    // console.log(this.datePipe.transform(queryDate, 'dd/MM/yyyy'));
    // console.log(tempDate);
    // let day = this.selectedDatePicker.day;
    // let month = this.selectedDatePicker.month;
    // let year = this.selectedDatePicker.year;
    // // console.log(day + " "+month+" "+year);
    // var raw = new Date(year, month-1, day);
    // var formatted =  this.datePipe.transform(raw, 'dd/MM/yyyy');
    // console.log(formatted); 
    // console.log(gpResult);
    let completeBookingObject: object = null;
    let singleRowObject: Object = null;
    let bookingMap = new Map<number, Object>();
    for (var num = 0; num < Object.keys(gpResult).length; num++) {
      // var doctorId = gpResult[num]["doctorId"];
      var doctorId = gpResult[num]["id"];
      var doctorName = gpResult[num]["firstName"]+" "+gpResult[num]["lastName"];
      // var queryDate = "12/04/2020";
      // console.log("111111");
      let rootUrl = "http://localhost:3000/";
      let slot: string[];
      let completeTimeSlot: string[] = ["9:00", "10:00", "11:00", "12:00", "13:00"];
      await this.httpInstance.get(`${rootUrl}booking/?doctorId=${doctorId}&bookedDate=${this.bookedDate}`).toPromise().then(bookingResult => {
        // console.log(bookingResult);
        if (Object.keys(bookingResult).length != 0) {
          for (var i = 0; i < Object.keys(bookingResult).length; i++) {
            var bookedTimeSlot = bookingResult[i]["bookedTime"];
            for (var j = 0; j < Object.keys(completeTimeSlot).length; j++) {
              if (bookedTimeSlot == completeTimeSlot[j]) {
                // console.log(doctorId);
                // console.log(bookedTimeSlot);
                // this.removeDocument(bookedTimeSlot);
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

  async getAsyncBookingDetails(doctorId, date) {
    let rootUrl = "http://localhost:3000/";
    return await this.httpInstance.get(`${rootUrl}booking/?doctorId=${doctorId}&bookedDate=${date}`).toPromise();
  }

  //remove the given element from complete list
  removeTimeSlot(givenTime, completTime) {
    completTime.forEach((item, index) => {
      if (item === givenTime) completTime.splice(index, 1);
    });
    return completTime;
  }


  private async getDoctorDetails(selectedValue) {
    let rootUrl = "http://localhost:3000";
    var result: object = null;
    await this.httpInstance.get(`${rootUrl}/registration?role=doctor&specialization=${selectedValue}`).toPromise().then(data => {
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
      isTreatmentCompleted: "no",
      prescription: ""
    };
    // this.setBookingDetails(bookingObject);
    // console.log(bookingObject);

    this.hmsService.saveBookingDetails(bookingObject).subscribe((result) => {
      // console.log(result);
      // console.log(result['bookedTime']);
      // this.router.navigate(['bookingSummary', { state: { bookingId: '100' } }]);
      this.router.navigate(['bookingSummary', {bookingId: result['id'] }]);
    });
  }

}
