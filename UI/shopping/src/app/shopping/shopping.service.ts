import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Item} from './shopping.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  url = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  public getAllItems(): Observable<any> {
    return this.http.get<Item[]>(this.url + '/items');
  }
}
