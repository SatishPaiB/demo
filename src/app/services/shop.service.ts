import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Shop } from '../shared/shop';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { map } from "rxjs/operators"; 
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ShopService {

  constructor(private restangular: Restangular,
              private processHTTPMsg: ProcessHTTPMsgService) { }

  getShops(): Observable<Shop[]> {
    return this.restangular.all('shops').getList();
  }

  getShop(id: number): Observable<Shop> {
    return  this.restangular.one('shops',id).get();
  }

  getFeaturedShop(): Observable<Shop> {
    return this.restangular.all('shops').getList({featured: true}).pipe(
      map(shops => shops[0])
    );
  }

  getShopIds(): Observable<number[]> {
    return this.getShops().pipe(
      map(shops => {return shops.map(shop => shop.id);} )
      ,catchError(error => {return of(error);})
    );
  }
}