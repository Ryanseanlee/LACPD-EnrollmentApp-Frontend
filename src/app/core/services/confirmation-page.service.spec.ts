import { TestBed } from '@angular/core/testing';

import { ConfirmationPageService } from './confirmation-page.service';

describe('ConfirmationPageService', () => {
  let service: ConfirmationPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfirmationPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
