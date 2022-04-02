import { SanityDataService } from './sanity-data.service';

describe('SanityDataService', () => {
  const service: SanityDataService = new SanityDataService();

  // beforeEach(() => {

  // });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should  create location', async (done) => {
    jest.setTimeout(200000)
    await service.createLocations()
    expect(true).toBeTruthy();
  },10000);
});
