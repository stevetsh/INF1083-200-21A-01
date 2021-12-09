import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { UserStoreService } from './user-store.service';
import { User } from '../model/user';

@Injectable()
export class UserService {

  private url: any = 'http://localhost:3000/api/user/';

  constructor(private http: HttpClient, private userStore: UserStoreService) {}

  login(user: User): Observable<any> {
    return this.http.post(this.url + 'login', user).pipe(map((resp: any) => {
      this.userStore.token = resp.token;
      return resp;
    }));
  }

  create(user: User): Observable<any> {
    return this.http.post(this.url + 'register', user);
  }

  register(username: string, password: string, name: string, phone: string): Observable<any> {
    return this.http.post(this.url + 'register', {
      username: username,
      password: password,
      name: name
    });
  }
}
