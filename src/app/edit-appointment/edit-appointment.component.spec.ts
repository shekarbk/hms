import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditAppointmentComponent } from './edit-appointment.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('EditAppointmentComponent', () => {
  let component: EditAppointmentComponent;
  let fixture: ComponentFixture<EditAppointmentComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAppointmentComponent ],
      imports: [FormsModule,ReactiveFormsModule,RouterTestingModule,HttpClientTestingModule, RouterTestingModule],
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
