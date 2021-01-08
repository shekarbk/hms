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
  constructor(private fb: FormBuilder, private activatedRouter: ActivatedRoute, private router: Router, private hmsService: HmsService) { }

  ngOnInit(): void {
    this.hmsService.getBookingSummaryDetailsAPI(this.activatedRouter.snapshot.params.id).subscribe((result) => {
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
    });
  }

  collectEditedBookingDetails() {
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

    this.hmsService.updatebookingDetailsAPI(updatedBookingObject).subscribe((result) => {
      this.alert = true;
    });

  }

  checkedExistingPatient(flag) {

  }

  handleCancel() {
    this.router.navigate(['viewAppointment']); //navigate to view appointment page
  }

  collectTreatmentDonetFlag(flag) {
    this.treatmentDonetFlagForRadio = flag;
  }

  closeAlert() {
    this.alert = false;
  }
}
