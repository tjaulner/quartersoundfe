import { TestBed } from '@angular/core/testing';

import { MusicsearchService } from './musicsearch.service';

describe('MusicsearchService', () => {
  let service: MusicsearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicsearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
