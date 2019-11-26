import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MatToolbarModule, MatListModule, MatGridListModule, MatButtonModule, MatCardModule,
  MatDialogModule, MatCheckboxModule, MatFormFieldModule, MatInputModule,
  MatSelectModule, MatSlideToggleModule, MatProgressSpinnerModule, MatSliderModule } from '@angular/material'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms'; 
import { ReactiveFormsModule } from '@angular/forms';

import { RestangularModule, Restangular } from 'ngx-restangular';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { MarketDetailComponent } from './marketdetail/marketdetail.component';
import { ShopDetailComponent } from './shopdetail/shopdetail.component';
import { HomeDetailComponent } from './homedetail/homedetail.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FlowComponent } from './flow/flow.component';


import { MarketService } from './services/market.service';
import { PlanService } from './services/plan.service';
import { ShopService } from './services/shop.service';
import { HomeService } from './services/home.service';

import { PromotionService } from './services/promotion.service';
import { LeaderService } from './services/leader.service';
import { ProcessHTTPMsgService } from './services/process-httpmsg.service';
import { FeedbackService } from './services/feedback.service';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';

import { baseURL } from './shared/baseurl';
import { RestangularConfigFactory } from './shared/restConfig';
import { HighlightDirective } from './directives/highlight.directive';
import { PlandetailComponent } from './plandetail/plandetail.component';
import { TradingviewComponent } from './tradingview/tradingview.component';
import { NewsComponent } from './news/news.component';
import { ShopComponent } from './shop/shop.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    FlowComponent,
    MarketDetailComponent,
    HeaderComponent,
    FooterComponent,
    AboutComponent,
    HomeComponent,
    ContactComponent,
    LoginComponent,
    HighlightDirective,
    PlandetailComponent,
    TradingviewComponent,
    NewsComponent,
    ShopComponent,
    ShopDetailComponent,
    HomeDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,    
    MatToolbarModule, 
    MatListModule,   
    MatGridListModule, 
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule, 
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RestangularModule.forRoot(RestangularConfigFactory)
  ],
  providers: [
    MarketService,
    ShopService,
    HomeService,
    PlanService,
    PromotionService,
    LeaderService,
    ProcessHTTPMsgService,
    FeedbackService,
    {provide: 'BaseURL', useValue: baseURL}
  ],
  entryComponents: [
    LoginComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
