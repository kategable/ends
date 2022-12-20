import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Calculation, ProductItem, State } from '@ends/api-interfaces';
import { BehaviorSubject, map, tap, switchMap, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private dataSubject = new BehaviorSubject<ProductItem[]>([]);
  private caclsSubject = new BehaviorSubject<Calculation[]>([]);
  private calculationsGetSubject = new BehaviorSubject<State | null>(null);
  private mapCalculations = new Map<string, Calculation[]>();
  public products$ = this.dataSubject.asObservable();
  public states$ = this.http.get<State[]>('api/states');
  public calculations$ = this.calculationsGetSubject.pipe(
    switchMap((state) => {
      console.log(state);
      //this.calculationsGetSubject.next(null);
      if (state === null) return [];
      if (this.mapCalculations.has(state.name))
        return of(this.mapCalculations.get(state.name));
      return this.http
        .get<Calculation[]>(`api/calc/${state.name}`)
        .pipe(tap((data) => this.mapCalculations.set(state.name, data)));
    })
  );

  constructor(private http: HttpClient) {}

  public addProducts(item: ProductItem) {
    const data = this.dataSubject.getValue();
    data.push(item);
    this.dataSubject.next(data);
  }

  public loadCalculation(state: State) {
    this.calculationsGetSubject.next(state);
  }
}
