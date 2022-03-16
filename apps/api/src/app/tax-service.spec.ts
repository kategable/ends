import { Address, CartRequest, Shipping } from '@ends/api-interfaces';

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
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '501';
    address.state = 'Colorado1';
    request.shipping = {address : address};
   // request.shipping.address = address;
   // request.shipping.address.state = 'NY';
    const result = service.culculate(request);
    expect(result).toEqual(0);
    // expect(result).toThrowError('no address found');
  });

  it('should return zero if nothing is found in the calculations for this state', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '77434';
    address.state = 'Colorado1';
    request.shipping = {address : address};
    const result = service.culculate(request);
    // Done
    expect(result).toEqual(0);
  });

  it('should return zero if city in calaculations doesnt match this city', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '77434';
    address.state = 'Colorado';
    request.shipping = {address : address};
    const result = service.culculate(request);
    // Done
    expect(result).toEqual(0);
  });
  it('should return zero if county in calaculations doesnt match this county', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '77434';
    address.state = 'Colorado';
    request.shipping = {address : address};
    const result = service.culculate(request);
    // Pending
    expect(result).toEqual(0);
  });
  it('should return zero if calaculation hasTax==false', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '85221';
    address.state = 'Pinal';
    request.shipping = {address : address};
    const result = service.culculate(request);
    // Done
    expect(result).toEqual(0);
  });
  it('should return zero when product ENDSTaxable===false', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '77434';
    address.state = 'Colorado';
    request.shipping = {address : address};
    const result = service.culculate(request);
    // Pending
    expect(result).toEqual(0);
  });
  it('should return 10.99 if calaculation hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    // Done
    expect(result).toEqual(10.99);
  });
  it('should return 11.99 if calaculation hasFluidRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    // Pending
    expect(result).toEqual(10.99);
  });
  it('should return 12.99 if calaculation hasRetailRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    // Pending
    expect(result).toEqual(10.99);
  });

  it('should return 13.99 if state and city in calaculation hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 14.99 if state, city, county (3 records) in calaculation hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 15.99 if county in calaculations (1 record) hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 15.98 if city in calaculations (1 record) hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 15.97 if state in calaculations (1 record) hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 16.99 if state and county in calaculations (2 records) hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 17.99 if state and city in calaculations (2 records) hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 18.99 if 2 products in cart hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
  it('should return 19.99 if 1 product quanity 2 in cart hasWholesaleRate==true', () => {
    let request = new CartRequest();
    let address = new Address();
    address.zipCode = '93201';
    address.state = 'Tulare';
    request.shipping = {address : address};
    const result = service.culculate(request);
    expect(result).toEqual(10.99);
  });
});
