import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DoctorsReportComponent } from './doctors-report.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('DoctorsReportComponent', () => {
  let component: DoctorsReportComponent;
  let fixture: ComponentFixture<DoctorsReportComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsReportComponent ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
