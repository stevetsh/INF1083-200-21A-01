import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Stock } from '../model/stock';

@Injectable()
export class StockService {
  url: any = 'http://localhost:3001/api/stock';

  constructor(private http: HttpClient) {}

  getStocks() : Observable<Stock[]> {
    return this.http.get<Stock[]>(this.url);
  }

  createStock(stock: Stock): Observable<any> {
    return this.http.post(this.url, stock);
  }

  toggleFavorite(stock: Stock): Observable<Stock> {
    return this.http.patch<Stock>(this.url + stock.code,
      {
        favorite: !stock.favorite
      });
  }
}
