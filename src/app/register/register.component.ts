import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HmsService } from '../hms.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selectedRoleType;
  isExistingPatient = false;
  regId: String = "";
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
    sex: new FormControl(),
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
    // console.log(this.registerHms.value);
    this.hmsService.saveRegistration(this.registerHms.value).subscribe((result) => {
      // console.log(result);
      this.generatedRegId=result['id'];
      this.profileHms.value.email = this.registerHms.value.email;
      this.profileHms.value.password = this.registerHms.value.password;
      this.profileHms.value.role = this.registerHms.value.role;
      this.createProfile();
      this.registerHms.reset({});
      this.alert = true;
    });
  }

  createProfile() {
    // console.log(this.profileHms.value);
    this.hmsService.createProfile(this.profileHms.value).subscribe((result) => {
      // console.log(result);
    });
  }

  searchRegId(id) {
    this.hmsService.getRegistrationDetails(id).subscribe((result) => {
      // console.log(result);
      if (Object.keys(result).length != 0) {
        // this.isRegistraionDetailsFound = false;
        // this.disableSubmitButton = true;
        // console.log(result);
        // console.log(result[0]['firstName']);
        this.regId = id;
        this.registerHms = new FormGroup({
          firstName: new FormControl(result[0]['firstName']),
          lastName: new FormControl(result[0]['lastName']),
          sex: new FormControl(result[0]['sex']),
          age: new FormControl(result[0]['age']),
          email: new FormControl(result[0]['email']),
          password: new FormControl(result[0]['password']),
          address: new FormControl(result[0]['address']),
          existingDiseases: new FormControl(result[0]['existingDiseases']),
          role: new FormControl(result[0]['role'])
        });

      } else {
        // this.isRegistraionDetailsFound = true;
        // this.disableSubmitButton = false;
        this.registerHms.reset({});
      }
    });
  }

  closeAlert() {
    this.alert = false;
  }

  updateRegistration() {
    // console.log(this.registerHms.value);
    this.hmsService.updateRegistration(this.regId, this.registerHms.value).subscribe((result) => {
      // console.log(result);
      this.isRegistrationUpdated = true;
      this.registerHms.reset({});
    });
  }

  handleCancel() {
    console.log("cancel clicked");
    this.registerHms.reset({});
  }

  handleSelectEvent(selectedValue){
    this.selectedRoleType = selectedValue;
    if(selectedValue==='doctor'){
      console.log("doctor selected");
    } else if(selectedValue==='patient'){
      console.log("patient selected");
    } else if(selectedValue==='admin'){
      console.log("Admin selected");
    }
    
  }
}

