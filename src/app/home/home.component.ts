/*
import { Component, OnInit, Inject } from '@angular/core';

import { Plan } from '../shared/plan';
import { PlanService } from '../services/plan.service';
import { Promotion } from '../shared/promotion';
import { PromotionService } from '../services/promotion.service';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  plan: Plan;
  promotion: Promotion;
  leader: Leader;

  planErrMess: string;
  promotionErrMess: string;
  leaderErrMess: string;

  constructor(private planservice: PlanService,
    private promotionservice: PromotionService,
    private leaderService: LeaderService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.planservice.getFeaturedPlan()
    .subscribe(plan => this.plan = plan,
      errmess => this.planErrMess = <any>errmess);
    this.promotionservice.getFeaturedPromotion()
    .subscribe(promotion => this.promotion = promotion,
      errmess => this.promotionErrMess = <any>errmess);
    this.leaderService.getFeaturedLeader()
    .subscribe(leader => this.leader = leader,
      errmess => this.leaderErrMess = <any>errmess);
  }

}



import { Component, OnInit, Inject } from '@angular/core';
import { Home } from '../shared/home';
import { HomeService } from '../services/home.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  homes: Home[];
  errMess: string;

  constructor(private homeService: HomeService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.homeService.getHomes()
    .subscribe(homes => this.homes = homes,
      errmess => this.errMess = <any>errmess);
  }

}

*/

import { Component, OnInit, Inject } from '@angular/core';
import { Home } from '../shared/home';
import { HomeService } from '../services/home.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class HomeComponent implements OnInit {

  homes: Home[];
  errMess: string;

  constructor(private homeService: HomeService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.homeService.getHomes()
    .subscribe(homes => this.homes = homes,
      errmess => this.errMess = <any>errmess);
  }

}
