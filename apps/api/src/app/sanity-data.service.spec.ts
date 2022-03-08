import { SanityDataService } from './sanity-data.service';

describe('SanityDataService', () => {
  let service: SanityDataService;

  beforeEach(() => {
   
    service = new SanityDataService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
