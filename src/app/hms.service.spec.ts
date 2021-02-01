import { TestBed } from '@angular/core/testing';
import { HmsService } from './hms.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('HmsService', () => {
  let service: HmsService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
    service = TestBed.inject(HmsService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
