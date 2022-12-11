import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calculation, ProductItem, State } from '@ends/api-interfaces';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private dataSubject = new BehaviorSubject<ProductItem[]>([]);
  public products$ = this.dataSubject.asObservable();
  public states$ = this.http.get<State[]>('api/states');

  constructor(private http: HttpClient) {}

  public addProducts(item: ProductItem) {
    const data = this.dataSubject.getValue();
    data.push(item);
    this.dataSubject.next(data);
  }

  public getCalculation(state: State): Observable<Calculation[]> {
    return this.http.get<Calculation[]>(`api/calc/${state.name}`);
  }
}
