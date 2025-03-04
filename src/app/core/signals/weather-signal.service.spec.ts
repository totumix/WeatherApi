import { TestBed } from '@angular/core/testing';

import { WeatherSignalService } from './weather-signal.service';

describe('WeatherSignalService', () => {
  let service: WeatherSignalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherSignalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
