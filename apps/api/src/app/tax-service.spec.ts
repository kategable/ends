import { CartRequest } from '@ends/api-interfaces';

import { TaxService } from './tax.service';

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(() => {
    service = new TaxService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should return an error when invalid state or zip', () => {
    const request = new CartRequest();
    const result = service.culculate(request);

    expect(result).toThrowError('no address found');
  });

  it('should return zero if nothing is found in the calculations for this state', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(0);
  });

  it('should return zero if city in calaculations doesnt match this city', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(0);
  });
  it('should return zero if county in calaculations doesnt match this county', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(0);
  });
  it('should return zero if calaculation hasTax==false', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(0);
  });

  it('should return 10.99 if calaculation hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 11.99 if calaculation hasFluidRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 12.99 if calaculation hasRetailRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });

  it('should return 13.99 if state and city in calaculation hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 14.99 if state, city, county (3 records) in calaculation hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 15.99 if county in calaculations (1 record) hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 15.98 if city in calaculations (1 record) hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 15.97 if state in calaculations (1 record) hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 16.99 if state and county in calaculations (2 records) hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 17.99 if state and city in calaculations (2 records) hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 18.99 if 2 products in cart hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 19.99 if 1 product quanity 2 in cart hasWholesaleRate==true', () => {
    const request = new CartRequest();
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
});
