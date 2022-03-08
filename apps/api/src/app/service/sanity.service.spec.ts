import { SanityService } from './sanity.service';

describe('SanityService', () => {
  let service: SanityService;

  beforeEach(() => {

    service =new SanityService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
