import { Injectable } from '@angular/core';
import { SanityService } from '@ends/data/sanity';

@Injectable({
  providedIn: 'root',
})
export class SanityDataService {
  constructor(private readonly service: SanityService) {}
  async getProducts() {
    return await this.service.getProducts();
  }
}
