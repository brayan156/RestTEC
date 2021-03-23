import { TestBed } from '@angular/core/testing';

import { ObjetosService } from './objetos.service';

describe('ObjetosService', () => {
  let service: ObjetosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjetosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
