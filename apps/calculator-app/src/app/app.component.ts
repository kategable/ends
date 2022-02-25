import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@ends/api-interfaces';

@Component({
  selector: 'ends-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = "http://localhost:3333"
  hello$ = this.http.get<Message>(`${this.url}/api/hello`);
  constructor(private http: HttpClient) {}
}
