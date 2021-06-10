import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRegistrationComponent } from './edit-registration.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { HmsService } from '../hms.service';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../../app/common/global-constants';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

describe('EditRegistrationComponent', () => {
  let component: EditRegistrationComponent;
  let fixture: ComponentFixture<EditRegistrationComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let hmsService: HmsService;
  let activatedRouter: ActivatedRoute;
  let routerSpy = {navigate: jasmine.createSpy('patientsReport')};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditRegistrationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{ path: 'patientsReport', component: EditRegistrationComponent }, 
        { path: 'doctorsReport', component: EditRegistrationComponent }]
      ), ReactiveFormsModule],     
    })
      .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    hmsService = TestBed.inject(HmsService);
    activatedRouter = TestBed.inject(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit', () => {
    const apiResponse =
    {
      "status": "success",
      "message": "details saved successfully !!!",
      "data": {
        "registrationId": 6,
        "firstName": 'chandra',
        "lastName": 'bk',
        "gender": null,
        "age": 0,
        "address": null,
        "existingDiseases": null,
        "email": null,
        "password": null,
        "qualification": null,
        "specialization": null,
        "yearOfExp": null,
        "role": null
      }
    };
    spyOn(hmsService, 'getRegistrationDetailsAPI').and.returnValue(of(apiResponse));
    activatedRouter.snapshot.params.id = 1;
    component.ngOnInit();
    expect('chandra').toEqual(component.registerHms.value.firstName);
  });

  // it('handleCancel for patientRole', () => {
  //   component.loginedUserRole = GlobalConstants.patientRole;
  //   component.handleCancel();      
  //   expect (routerSpy.navigate).toHaveBeenCalledWith(['/patientsReport']);
  // });

  // it('handleCancel for doctorRole', () => {
  //   component.loginedUserRole = GlobalConstants.doctorRole;
  //   component.handleCancel();
  // });

});
