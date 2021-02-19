import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";
import { HmsService } from '../hms.service';
import { of } from 'rxjs';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let hmsService: HmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    hmsService = TestBed.inject(HmsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('collectRegistrationData', () => {
    const apiResponse =
    {
      "status": "success",
      "message": "details saved successfully !!!",
      "data": {
        "registrationId": 6,
        "firstName": null,
        "lastName": null,
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

    spyOn(hmsService, 'saveRegistrationAPI').and.returnValue(of(apiResponse));
    component.collectRegistrationData();
    expect(true).toEqual(component.alert);
    expect(component.generatedRegId).not.toEqual(0);
  });

  it('searchRegId with success',()=>{
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
    component.searchRegId(jasmine.any(Number));
    expect(6).toEqual(component.regId);
  });

  it('searchRegId with failed',()=>{
    const apiResponse =
    {
      "status": "failed",
      "message": "details saved successfully !!!",
      "data": null
    };
    spyOn(hmsService, 'getRegistrationDetailsAPI').and.returnValue(of(apiResponse));
    component.searchRegId(jasmine.any(Number));
    expect(0).toEqual(component.regId);
  });
});
