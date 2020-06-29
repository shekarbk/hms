import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HmsService } from '../hms.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-registration',
  templateUrl: './edit-registration.component.html',
  styleUrls: ['./edit-registration.component.css']
})
export class EditRegistrationComponent implements OnInit {

  isRegistrationUpdated = false;
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
    this.searchRegId(this.activatedRouter.snapshot.params.id);
  }

  handleCancel() {
    this.router.navigate(['patientsReport']);
  }

  updateRegistration() {
    this.hmsService.updateRegistration(this.activatedRouter.snapshot.params.id, this.registerHms.value).subscribe((result) => {
      // console.log(result);
      this.isRegistrationUpdated = true;
    });
  }

  closeAlert() {
    this.alert = false;
  }

  searchRegId(id) {
    this.hmsService.getRegistrationDetails(id).subscribe((result) => {
      // console.log(result);
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
    });
  }
}
