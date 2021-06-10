import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAppointmentsComponent } from './view-appointments.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HmsService } from '../hms.service';
import { of } from 'rxjs';

describe('ViewAppointmentsComponent', () => {
  let component: ViewAppointmentsComponent;
  let fixture: ComponentFixture<ViewAppointmentsComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let hmsService: HmsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewAppointmentsComponent],
      imports: [HttpClientTestingModule, NgbModule]
    })
      .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    hmsService = TestBed.inject(HmsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onInit', () => {
    const apiResponse = {
      "status": "success",
      "message": null,
      "data": [
        {
          "bookingId": 1,
          "bookedDate": "10-10-2020",
          "bookedTime": "9:00",
          "doctorId": 2,
          "doctorName": "GOPAL ROA",
          "treatmentType": "GeneralPhysican",
          "purpose": "cold&fever",
          "patientId": 1,
          "patientName": "CHANDRA BK",
          "isTreatmentCompleted": "NOT_COMPLETED",
          "prescription": "Dolo 650"
        }
      ]
    }
    spyOn(hmsService, 'getAppointmentDetails').and.returnValue(of(apiResponse));
    component.ngOnInit();
    expect(null).not.toEqual(component.appointmentDetails);
  });

  it('showDetails', () => {
    component.selectedDatePicker = undefined;
    const apiResponse = {
      "status": "success",
      "message": null,
      "data": [
        {
          "bookingId": 1,
          "bookedDate": "10-10-2020",
          "bookedTime": "9:00",
          "doctorId": 2,
          "doctorName": "GOPAL ROA",
          "treatmentType": "GeneralPhysican",
          "purpose": "cold&fever",
          "patientId": 1,
          "patientName": "CHANDRA BK",
          "isTreatmentCompleted": "NOT_COMPLETED",
          "prescription": "Dolo 650"
        }
      ]
    }
    spyOn(hmsService, 'getAppointmentDetails').and.returnValue(of(apiResponse));
    component.showDetails();
    expect(null).not.toEqual(component.appointmentDetails);
  });

  it('cancelAppointment', () => {
    const apiResponse =
    {
      "status": "success",
      "message": "details saved successfully !!!",
      "data": null
    }
    spyOn(hmsService, 'cancelAppointmentAPI').and.returnValue(of(apiResponse));
    component.cancelAppointment(jasmine.any);
    expect(true).toEqual(component.alert);
  });

  it('closeAlert', () => {
    component.closeAlert();
    expect(false).toEqual(component.alert);
  });
});
