import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ends/api-interfaces';

@Component({
  selector: 'ends-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  hello$ = this.http.get<Message>('/api/hello');
  products$ = this.http.get<any[]>('api/products')
  constructor(private http: HttpClient) {}
}
