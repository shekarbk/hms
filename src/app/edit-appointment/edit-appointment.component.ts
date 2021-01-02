import { Component, OnInit } from '@angular/core';
import { HmsService } from '../hms.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit {
  treatmentDonetFlagForRadio = "NOT_COMPLETED";
  alert: boolean = false;

  // dummyValue: string[] = ["yes", "no"];

  editBooking = new FormGroup({
    bookedDate: new FormControl(''),
    bookedTime: new FormControl(''),
    doctorName: new FormControl(''),
    doctorId: new FormControl(''),
    treatmentType: new FormControl(''),
    purpose: new FormControl(''),
    patientId: new FormControl(''),
    treatmentDoneFlag: new FormControl(''),
    prescription: new FormControl('')
  });

  disableUpdateButton = false;
  constructor(private fb: FormBuilder, private activatedRouter: ActivatedRoute,private router: Router, private hmsService: HmsService) { }

  ngOnInit(): void {
    // this.treatmentDonetFlag="yes";

    // this.hmsService.getBookingSummaryDetails(this.activatedRouter.snapshot.params.id).subscribe((result) => {
    //   // console.log(result);
    //   this.editBooking = new FormGroup({
    //     bookedDate: new FormControl(result[0]['bookedDate']),
    //     bookedTime: new FormControl(result[0]['bookedTime']),
    //     doctorName: new FormControl(result[0]['doctorName']),
    //     doctorId: new FormControl(result[0]['doctorId']),
    //     treatmentType: new FormControl(result[0]['treatmentType']),
    //     purpose: new FormControl(result[0]['purpose']),
    //     patientId: new FormControl(result[0]['patientId']),
    //     patientName: new FormControl(result[0]['patientName']),
    //     prescription: new FormControl(result[0]['prescription']),
    //   });
    //   this.treatmentDonetFlagForRadio = result[0]['isTreatmentCompleted'];
    //   // console.log(result[0]['isTreatmentCompleted']);
    // });

    this.hmsService.getBookingSummaryDetailsAPI(this.activatedRouter.snapshot.params.id).subscribe((result) => {
      // console.log(result);
      this.editBooking = new FormGroup({
        bookedDate: new FormControl(result['data'].bookedDate),
        bookedTime: new FormControl(result['data'].bookedTime),
        doctorName: new FormControl(result['data'].doctorName),
        doctorId: new FormControl(result['data'].doctorId),
        treatmentType: new FormControl(result['data'].treatmentType),
        purpose: new FormControl(result['data'].purpose),
        patientId: new FormControl(result['data'].patientId),
        patientName: new FormControl(result['data'].patientName),
        prescription: new FormControl(result['data'].prescription),
      });
      this.treatmentDonetFlagForRadio = result['data'].isTreatmentCompleted;
      // console.log(result[0]['isTreatmentCompleted']);
    });
  }

  collectEditedBookingDetails() {
    // console.log(this.editBooking.value);
    // console.log(this.treatmentDonetFlagForRadio);
    // console.log(this.editBooking.value['bookedDate']);

    // if(this.treatmentDonetFlagForRadio == 'yes'){
    //   this.treatmentDonetFlagForRadio = 'COMPLETED';
    // } else {
    //   this.treatmentDonetFlagForRadio = 'NOT_COMPLETED';
    // }
    let updatedBookingObject = {
      bookedDate: this.editBooking.value['bookedDate'],
      bookedTime: this.editBooking.value['bookedTime'],
      doctorName: this.editBooking.value['doctorName'],
      doctorId: this.editBooking.value['doctorId'],
      treatmentType: this.editBooking.value['treatmentType'],
      purpose: this.editBooking.value['purpose'],
      patientId: this.editBooking.value['patientId'],
      patientName: this.editBooking.value['patientName'],
      isTreatmentCompleted: this.treatmentDonetFlagForRadio,
      prescription: this.editBooking.value['prescription'],
      bookingId: this.activatedRouter.snapshot.params.id
    };

    // this.hmsService.updatebookingDetails(this.activatedRouter.snapshot.params.id, updatedBookingObject).subscribe((result) => {
    //   // console.log(result);
    //   this.alert = true;
    // });

    this.hmsService.updatebookingDetailsAPI(updatedBookingObject).subscribe((result) => {
      // console.log(result);
      this.alert = true;
    });

  }

  checkedExistingPatient(flag) {

  }

  handleCancel() {
    // console.log("cancel clicked");
    this.router.navigate(['viewAppointment']); //navigate to view appointment page
  }

  collectTreatmentDonetFlag(flag) {  
    this.treatmentDonetFlagForRadio = flag;
  }

  closeAlert() {
    this.alert = false;
  }
}
