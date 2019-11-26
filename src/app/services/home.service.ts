import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Home } from '../shared/home';
import { baseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';

import { Observable } from 'rxjs';
import { RestangularModule, Restangular } from 'ngx-restangular';

import { map } from "rxjs/operators"; 
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HomeService {

  constructor(private restangular: Restangular,
              private processHTTPMsg: ProcessHTTPMsgService) { }

  getHomes(): Observable<Home[]> {
    return this.restangular.all('homes').getList();
  }

  getHome(id: number): Observable<Home> {
    return  this.restangular.one('homes',id).get();
  }

  getFeaturedHome(): Observable<Home> {
    return this.restangular.all('homes').getList({featured: true}).pipe(
      map(homes => homes[0])
    );
  }

  getHomeIds(): Observable<number[]> {
    return this.getHomes().pipe(
      map(homes => {return homes.map(home => home.id);} )
      ,catchError(error => {return of(error);})
    );
  }
}