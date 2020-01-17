import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';

import {MACD_RESULT , RSI_RESULT} from '../flow/flow.component';
import {Mellat, Khodro, Shepna} from '../shared/stock_inf';
import { NewsComponent } from '../news/news.component';


@Component({
  selector: 'app-ngx-charts',
  templateUrl: './ngx-charts.component.html',
  styleUrls: ['./ngx-charts.component.scss']
})



export class NgxChartsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<NgxChartsComponent>) { }



  // data goes here
public single = [
  {
    "name": " درصد سود",
    "value": 69
  },
  {
    "name": " درصد زیان",
    "value": 31
  },
  
];


mellat = Mellat;
khodro = Khodro;
shepna = Shepna;

 macd_result = MACD_RESULT;
 rsi_result = RSI_RESULT;
// LENGTH = RSI_RESULT.length;
 newArray = RSI_RESULT.map((e, i) => ({
  name: (i + 1).toString(),
  "value": e,
}));


public mmulti = [
  {
    "name": "Mellat",
    "series": this.newArray
  },

  {
    "name": "Khodro",
    "series": this.newArray
  },

  {
    "name": "Shepna",
    "series": this.newArray
  }
];

//{name: (i + 1).toString(), value: e.toString()}

 

  view: any[] = [700, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'زمان';
  showYAxisLabel = true;
  yAxisLabel = 'قیمت';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  //pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  ngOnInit() {
    console.log(this.newArray);

  }
}





