import { Routes } from '@angular/router';

import { MenuComponent } from '../menu/menu.component';
import { FlowComponent } from '../flow/flow.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { NewsComponent } from '../news/news.component';

import {TradingviewComponent} from '../tradingview/tradingview.component';
import { MarketDetailComponent } from '../marketdetail/marketdetail.component';
import { ShopDetailComponent } from '../shopdetail/shopdetail.component';
import { HomeDetailComponent } from '../homedetail/homedetail.component';



export const routes: Routes = [
  { path: 'home',  component: HomeComponent },
  { path: 'menu',     component: MenuComponent },
  { path: 'flow',     component: FlowComponent },
  { path: 'tradingview',     component: TradingviewComponent },
  { path: 'news',     component: NewsComponent },
  { path: 'contactus',     component: ContactComponent },
  { path: 'aboutus',     component: AboutComponent },
  { path: 'marketdetail/:id',     component: MarketDetailComponent },
  { path: 'shopdetail/:id',     component: ShopDetailComponent },
  { path: 'homedetail/:id',     component: HomeDetailComponent },

  { path: '', redirectTo: '/home', pathMatch: 'full' }
];