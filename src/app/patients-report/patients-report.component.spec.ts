import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsReportComponent } from './patients-report.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { GlobalConstants } from '../../app/common/global-constants';
import { HmsService } from '../hms.service';
import { of } from 'rxjs';

describe('PatientsReportComponent', () => {
  let component: PatientsReportComponent;
  let fixture: ComponentFixture<PatientsReportComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let hmsService: HmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PatientsReportComponent]
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    hmsService = TestBed.inject(HmsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPatientDetails with Admin Role', () => {
    component.logedInUserRole = GlobalConstants.adminRole;
    const apiResponse = [
      {
        "status": "success",
        "message": "details saved successfully !!!",
        "data": null
      }
    ];
    spyOn(hmsService, 'getAllRegistrationDetailsByRoleAPI').and.returnValue(of(apiResponse));
    expect(component.patientProfileDetails).not.toEqual(null);
  });

  it('getPatientDetails with PatientRole', () => {
    component.logedInUserRole = GlobalConstants.patientRole;
    const apiResponse = [
      {
        "status": "success",
        "message": "details saved successfully !!!",
        "data": null
      }
    ];
    spyOn(hmsService, 'getSpecificProfileDetailsAPI').and.returnValue(of(apiResponse));
    expect(component.patientProfileDetails).not.toEqual(null);
  });

});
