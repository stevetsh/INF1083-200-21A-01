import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { Stock } from '../model/stock';
//import { HttpEvent } from '@angular/common/http/src/response';
import { UserStoreService } from './user-store.service';

@Injectable()
export class StockService {
  private url: any = 'http://localhost:3000/api/stock/';

  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  getStocks() : Observable<Stock[]> {
    return this.http.get<Stock[]>(this.url);
  }

  getStock(code: string): Observable<Stock> {
    return this.http.get<Stock>(this.url + code);
  }

  createStock(stock: Stock): Observable<any> {
    return this.http.post(this.url , stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>(this.url + stock.code,
      {
        favorite: !stock.favorite
      });
  }
}
