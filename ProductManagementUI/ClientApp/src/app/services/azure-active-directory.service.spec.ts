import { TestBed } from '@angular/core/testing';

import { AzureActiveDirectoryService } from './azure-active-directory.service';

describe('AzureActiveDirectoryService', () => {
  let service: AzureActiveDirectoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AzureActiveDirectoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
