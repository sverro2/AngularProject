import { TestBed, inject } from '@angular/core/testing';

import { CreateService } from './create.service';

describe('CreateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateService]
    });
  });

  it('should ...', inject([CreateService], (service: CreateService) => {
    expect(service).toBeTruthy();
  }));
});
