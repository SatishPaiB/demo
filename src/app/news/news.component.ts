import { Component, OnInit, Inject } from '@angular/core';
import { Shop } from '../shared/shop';
import { ShopService } from '../services/shop.service';
import { flyInOut, expand } from '../animations/app.animation';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})
export class NewsComponent implements OnInit {

  shops: Shop[];
  errMess: string;

  constructor(private shopService: ShopService,
    @Inject('BaseURL') private BaseURL) { }

  ngOnInit() {
    this.shopService.getShops()
    .subscribe(shops => this.shops = shops,
      errmess => this.errMess = <any>errmess);
  }

}
