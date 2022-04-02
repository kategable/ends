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

  // it('should  get product by id ', async (done) => {
  //   jest.setTimeout(200000)
  //   let product  =  service.getProductbyId("7554590867680")
  //   expect(product).toBeTruthy();
  // },10000);
});
