import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HmsService } from '../hms.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { GlobalConstants } from '../../app/common/global-constants';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {
  selectedRoleType;
  isRegistrationUpdated = false;
  loginedUserRole:any;
  alert = false;
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

  constructor(private hmsService: HmsService, private activatedRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.loginedUserRole = localStorage.getItem("loginedUserRole");
    this.searchRegId(this.activatedRouter.snapshot.params.id);
  }

  handleCancel() {
    if (this.loginedUserRole === GlobalConstants.patientRole) {
      this.router.navigate(['patientsReport']);
    } else if (this.loginedUserRole === GlobalConstants.doctorRole) {
      this.router.navigate(['doctorsReport']);
    }
  }

  updateRegistration() {
    let updateRequestData = {
      registrationId: this.activatedRouter.snapshot.params.id,
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
      this.isRegistrationUpdated = true;
    });
  }

  closeAlert() {
    this.alert = false;
  }

  searchRegId(id) {
    this.hmsService.getRegistrationDetailsAPI(id).subscribe((result) => {
      this.registerHms = new FormGroup({
        firstName: new FormControl(result['data'].firstName),
        lastName: new FormControl(result['data'].lastName),
        sex: new FormControl(result['data'].gender),
        age: new FormControl(result['data'].age),
        email: new FormControl(result['data'].email),
        password: new FormControl(result['data'].password),
        address: new FormControl(result['data'].address),
        existingDiseases: new FormControl(result['data'].existingDiseases),
        role: new FormControl(result['data'].role),
        qualification: new FormControl(result['data'].qualification),
        specialization: new FormControl(result['data'].specialization),
        yearOfExp: new FormControl(result['data'].yearOfExp)
      });
      this.selectedRoleType = result['data'].role;
    });
  }

  handleSelectEvent(selectedValue) {
    this.selectedRoleType = selectedValue;
  }


}
