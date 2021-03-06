import { Component, OnInit, AfterViewInit } from '@angular/core';


declare const TradingView: any;

@Component({
  selector: 'app-tradingview',
  templateUrl: './tradingview.component.html',
  styleUrls: ['./tradingview.component.scss']
})



export class TradingviewComponent implements OnInit, AfterViewInit {

  constructor() { }
  searchText : string;
  course : any;
  ngOnInit() {
    this.course = [
      { id: 1, name: 'HTML' },
      { id: 2, name: 'CSS' },
      { id: 3, name: 'JAVASCRIPT' },
      { id: 4, name: 'ANGULAR' },
      { id: 5, name: 'REACT' },
      { id: 6, name: 'NODEJS' },
      { id: 7, name: 'PHP' },
      { id: 8, name: 'MYSQL' }
    ]
  }

  ngAfterViewInit(){
    new TradingView.widget(
      {
      "width": 980,
      "height": 610,
      "symbol": "BTCUSD",
      "timezone": "Etc/UTC",
      "theme": "Light",
      "style": "1",
      "locale": "en",
      "toolbar_bg": "#f1f3f6",
      "enable_publishing": false,
      "withdateranges": true,
      "range": "ytd",
      "hide_side_toolbar": false,
      "allow_symbol_change": true,
      "show_popup_button": true,
      "popup_width": "1000",
      "popup_height": "650",
      "no_referral_id": true,
      "container_id": "tradingview_bac65"
    }
      );
  }

}
