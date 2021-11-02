import { TestBed } from '@angular/core/testing';

import { ClientesServicioService } from './clientes-servicio.service';

describe('ClientesServicioService', () => {
  let service: ClientesServicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientesServicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
