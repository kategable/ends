import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { map } from 'rxjs';
import { ProductItem } from '../../../../../libs/api-interfaces/src/lib/product-item';
import { ProductsService } from '../products.service';
import { ProductsDataSource } from './products-datasource';

@Component({
  selector: 'ends-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<ProductItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name','wholeSalePrice'];
  length$ = this.productService.products$.pipe(map((products) => products.length));
  constructor(private readonly productDataService: ProductsDataSource,
    private readonly productService: ProductsService) {}

  ngAfterViewInit(): void {
    this.productDataService.sort = this.sort;
    this.productDataService.paginator = this.paginator;
    this.table.dataSource = this.productDataService;
  }
}
