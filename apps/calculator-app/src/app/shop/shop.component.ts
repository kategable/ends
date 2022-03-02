
import { Component, Input } from '@angular/core';
@Component({
  selector: 'ends-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})

export class ShopComponent {

  @Input() products: any;
  categories: any[] = [];
}
