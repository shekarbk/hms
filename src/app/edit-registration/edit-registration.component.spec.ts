import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditRegistrationComponent } from './edit-registration.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { RouterTestingModule } from "@angular/router/testing";

describe('EditRegistrationComponent', () => {
  let component: EditRegistrationComponent;
  let fixture: ComponentFixture<EditRegistrationComponent>;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditRegistrationComponent],
      imports: [HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
