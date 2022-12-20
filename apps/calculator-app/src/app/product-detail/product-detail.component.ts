import { ProductsService } from './../products.service';
import { Component } from '@angular/core';
import { ProductItem, State } from '@ends/api-interfaces';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'ends-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  constructor(private readonly productService: ProductsService) {}

  state: State ;
  model: ProductItem = { name: '', id: '' };
  reloadSubject = new BehaviorSubject<boolean | null>(null);
  stateSelected = false;
  states$ = this.productService.states$;
  calculations$ = this.productService.calculations$;
  submit(): void {
    console.log(this.model);
    this.productService.addProducts({ ...this.model });
  }
  onStateChange(state: State) {
    //call api and get tax for this state
    this.state = state;
    this.stateSelected = true;
    this.productService.loadCalculation(this.state);

  }
}
