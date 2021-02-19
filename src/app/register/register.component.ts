import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HmsService } from '../hms.service';
import { GlobalConstants } from '../../app/common/global-constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedRoleType;
  isExistingPatient = false;
  regId: number = 0;
  alert: boolean = false;
  isRegistraionDetailsFound: boolean = false;
  isRegistrationUpdated: boolean = false;
  disableUpdateButton: boolean = false;
  disableSubmitButton: boolean = false;
  isExistingPatientNo: boolean = false;
  generatedRegId: number = 0;

  registerHms = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    gender: new FormControl(),
    age: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    address: new FormControl(),
    existingDiseases: new FormControl(),
    role: new FormControl(),
    qualification: new FormControl(),
    specialization: new FormControl(),
    yearOfExp: new FormControl()
  });

  profileHms = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
    role: new FormControl()
  });

  constructor(private hmsService: HmsService, private router: Router) { }

  ngOnInit(): void {
    this.disableSubmitButton = false;
    this.disableUpdateButton = true;
  }

  checkedExistingPatient(isExisting) {
    if (isExisting == "yes") {
      this.disableSubmitButton = true;
      this.disableUpdateButton = false;
      this.isExistingPatient = true;
    } else {
      this.disableSubmitButton = false;
      this.disableUpdateButton = true;
      this.isExistingPatient = false;
    }
  }

  collectRegistrationData() {
    this.hmsService.saveRegistrationAPI(this.registerHms.value).subscribe((result) => {
      this.generatedRegId = result['data'].registrationId;
      this.registerHms.reset({});
      this.alert = true;
    });
  }

  searchRegId(id) {
    this.hmsService.getRegistrationDetailsAPI(id).subscribe((result) => {
      if (result["status"] == GlobalConstants.SUCCESS) {
        this.regId = result['data'].registrationId;
        this.registerHms = new FormGroup({
          firstName: new FormControl(result['data'].firstName),
          lastName: new FormControl(result['data'].lastName),
          sex: new FormControl(result['data'].gender),
          age: new FormControl(result['data'].age),
          email: new FormControl(result['data'].email),
          password: new FormControl(result['data'].password),
          address: new FormControl(result['data'].address),
          existingDiseases: new FormControl(result['data'].existingDiseases),
          role: new FormControl(result['data'].role)
        });
      }
      else {
        this.registerHms.reset({});
      }
    });
  }

  closeAlert() {
    this.alert = false;
  }

  updateRegistration() {

    let updateRequestData = {
      registrationId: this.regId,
      firstName: this.registerHms.value.firstName,
      lastName: this.registerHms.value.lastName,
      gender: this.registerHms.value.gender,
      age: this.registerHms.value.age,
      address: this.registerHms.value.address,
      existingDiseases: this.registerHms.value.existingDiseases,
      email: this.registerHms.value.email,
      password: this.registerHms.value.password,
      qualification: this.registerHms.value.qualification,
      specialization: this.registerHms.value.specialization,
      yearOfExp: this.registerHms.value.yearOfExp,
      role: this.registerHms.value.role,
    };

    this.hmsService.updateRegistrationAPI(updateRequestData).subscribe((result) => {
      console.log(result);
      this.isRegistrationUpdated = true;
      this.registerHms.reset({});
    });
  }

  handleCancel() {
    this.registerHms.reset({});
  }

  handleSelectEvent(selectedValue) {
    this.selectedRoleType = selectedValue;
    if (selectedValue === 'doctor') {
      console.log("doctor selected");
    } else if (selectedValue === 'patient') {
      console.log("patient selected");
    } else if (selectedValue === 'admin') {
      console.log("Admin selected");
    }
  }
}

