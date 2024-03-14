import { TestBed } from '@angular/core/testing';

import { KupovinaService } from './kupovina.service';

describe('KupovinaService', () => {
  let service: KupovinaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KupovinaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
