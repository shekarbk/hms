import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '../app.component';
import { LoginComponent } from './login.component';
import { HmsService } from '../hms.service';
import { of } from 'rxjs';
import { GlobalConstants } from '../../app/common/global-constants';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ViewAppointmentsComponent } from '../view-appointments/view-appointments.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let appInstance: AppComponent;
  let hmsService: HmsService;
  let formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(
        [{ path: 'viewAppointment', component: ViewAppointmentsComponent }]
      ), ReactiveFormsModule],
      declarations: [LoginComponent],
      providers: [AppComponent],

    })
      .compileComponents();
    appInstance = TestBed.inject(AppComponent);
    hmsService = TestBed.inject(HmsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    component.loginHms.value.role = GlobalConstants.adminRole;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('do health check Sucess', () => {
    const apiResponse = [
      {
        "status": "success",
        "message": "details saved successfully !!!",
        "data": null
      }
    ];
    spyOn(hmsService, 'getHealthCheckAPI').and.returnValue(of(apiResponse));
    component.ngOnInit();
    expect(false).toEqual(component.errorInfoFlag);
  });

  // it('do health check Failure', () => {
  //   spyOn(hmsService, 'getHealthCheckAPI').and.throwError('MyError');
  //   component.ngOnInit();
  //   expect(false).toEqual(component.errorInfoFlag);
  // });
  ///////////////////////////////////////////////////////////////////////
  it('login validation', () => {

    const loginUserDetailsApiMockResponse =
    {
      "status": "success",
      "message": "details saved successfully !!!",
      "data": null
    };

    component.loginHms = formBuilder.group({
      email: 'chandra@gmail.com',
      password: 'test123',
      loginType: GlobalConstants.adminRole
    });

    spyOn(hmsService, 'getLoginUserDetailsAPI').and.returnValue(of(loginUserDetailsApiMockResponse));
    // let response;
    // hmsService.getLoginUserDetailsAPI(loginRequestData).subscribe(res => {
    //   response = res;
    // });

    const getSpecificProfileDetailsApiMockResponse =
    {
      "status": "success",
      "message": "details fetched successfully !!!",
      "data": [
        {
          "registrationId": 1,
          "firstName": "CHANDRA",
          "lastName": "BK",
          "gender": "MALE",
          "age": 0,
          "address": "KCC",
          "existingDiseases": "NA",
          "email": "chandra@gmail.com",
          "password": "test123",
          "qualification": null,
          "specialization": null,
          "yearOfExp": null,
          "role": "ADMIN"
        }
      ]
    };

    let email = "chandra@gmail.com"
    spyOn(hmsService, 'getSpecificProfileDetailsAPI').and.returnValue(of(getSpecificProfileDetailsApiMockResponse));
    component.collectLogin();
    expect('enabled').toEqual(appInstance.isNavEnable);
    expect('enabled').toEqual(appInstance.isRegistrationTabEnable);
  });
});
