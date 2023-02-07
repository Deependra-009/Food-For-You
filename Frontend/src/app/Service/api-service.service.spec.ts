import { TestBed } from '@angular/core/testing';

import { APISERVICEService } from './api-service.service';

describe('APISERVICEService', () => {
  let service: APISERVICEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APISERVICEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
