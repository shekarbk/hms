import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorsReportComponent } from './doctors-report.component';

describe('DoctorsReportComponent', () => {
  let component: DoctorsReportComponent;
  let fixture: ComponentFixture<DoctorsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorsReportComponent ]
    })
    .compileComponents();
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
