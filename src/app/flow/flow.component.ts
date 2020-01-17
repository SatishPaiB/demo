import { Component, ViewChild, ElementRef, OnInit, AfterViewInit, AfterContentInit, AfterViewChecked, AfterContentChecked } from '@angular/core';
import {
  Compiler,
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  ModuleWithComponentFactories,
  NgModule,
  ViewContainerRef
} from '@angular/core';

import { flyInOut, expand } from '../animations/app.animation';
import { Feedback, Periods, Inputs, Ifs, Results } from '../shared/feedback';
import {Mellat , Khodro, Shepna} from '../shared/stock_inf';

import { sma, rsi, RSI } from 'technicalindicators';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MatDialog, MatDialogRef } from '@angular/material';
import { NgxChartsComponent } from '../ngx-charts/ngx-charts.component';



declare var $: any;

var pricess: number[]; // = [1,2,3,4,5,6,7,8,9,10,12,13,15];
var periodd: number;
var macd_result: number[];
var rsi_result: number[];



@Component({
  selector: 'flow-home',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    expand()
  ]
})

export class FlowComponent implements AfterViewInit {

  public diagModel: any;

  private cx: number;
  private cy: number;

  periods = Periods;
  inputs = Inputs;
  ifs = Ifs;
  results = Results;
  mellat = Mellat;
  khodro = Khodro;
  shepna = Shepna;

  label1 = '';
  label2 = '';
  label3 = '';
  label4 = '';


  @ViewChild('exampleDiv',{static:true}) exampleDiv: ElementRef;



  constructor(private dialog: MatDialog) {
  }



  ngAfterViewInit() {


    var container = $('#chart_container');
    this.cx = $('#exampleDiv').width() /2;
    this.cy = $('#exampleDiv').height() /2;
    $('#exampleDiv').panzoom({
    });
    $('#exampleDiv').panzoom('pan', -this.cx + container.width() / 2, -this.cy + container.height() / 2);

    var possibleZooms = [ 1, 1.5, 2 ];
    var currentZoom = 1

    container.on('mousewheel.focal', function (e) {
      e.preventDefault();
      var delta = (e.delta || e.originalEvent.wheelDelta) || e.originalEvent.detail;
      var zoomOut: any = delta ? delta < 0 : e.originalEvent.deltaY > 0;
      currentZoom = Math.max(0, Math.min(possibleZooms.length - 1, (currentZoom + (zoomOut * 2 - 1))));
      $('#exampleDiv').flowchart('setPositionRatio', possibleZooms[currentZoom]);
      $('#exampleDiv').panzoom('zoom', possibleZooms[currentZoom], {
        animate: false,
        focal: e
      });

    });


    setTimeout(() => {
      $(this.exampleDiv.nativeElement).flowchart({
        data: '',
        multipleLinksOnOutput: true,
      });

    }, 1000);

  }


  getOperatorData($element) {
    var nbInputs = parseInt($element.data('nb-inputs'));
    var nbOutputs = parseInt($element.data('nb-outputs'));
    var data = {
      properties: {
        title: $element.text(),
        inputs: {},
        outputs: {}
      }
    };

    var i = 0;
    for (i = 0; i < nbInputs; i++) {
      data.properties.inputs['input_' + i] = {
        label: 'Input ' + (i + 1)
      };
    }
    for (i = 0; i < nbOutputs; i++) {
      data.properties.outputs['output_' + i] = {
        label: 'Output ' + (i + 1)
      };
    }

    return data;
  }



  operatorI = 0;
  operatorII = 0;


  addNewOperator() {

    var operatorId = 'created_operator_' + this.operatorI;
    var operatorData = {
      top: this.cx,
      left: this.cy,
      properties: {
        title: 'RSI' , // + (this.operatorI + 1),
        class: 'myTest',
        inputs: {
          input_1: {
            label: 'ورودی یک',
          },
          input_2: {
            label: 'ورودی دو',
          },

        },
        outputs: {
          output_1: {
            label: 'خروجی',
          },


        }
      }
    }

    this.operatorI++;
    $(this.exampleDiv.nativeElement).flowchart('createOperator', operatorId, operatorData);
  }

  addNewOperator2() {

    var operatorId = 'created_operator_' + this.operatorI;
    var operatorData = {
      top: this.cx,
      left: this.cy,
      properties: {
        title: 'MACD' , // + (this.operatorI + 1),
        class: 'myTest2',
        inputs: {
          input_1: {
            label: 'ورودی یک',
          },
          input_2: {
            label: 'ورودی دو',
          },

        },
        outputs: {
          output_1: {
            label: 'خروجی',
          },

        }
      }
    }

    this.operatorI++;
    $(this.exampleDiv.nativeElement).flowchart('createOperator', operatorId, operatorData);
  }

  addNewOperator3() {

    var operatorId = 'created_operator_' + this.operatorI;
    var operatorData = {
      top: this.cx,
      left: this.cy,
      properties: {
        title: 'ورودی' ,
        class: 'input_circle',
        inputs: {

        },
        outputs: {
          output_1: {
            label: ' ',
          },

        }
      }
    }

    this.operatorI++;
    $(this.exampleDiv.nativeElement).flowchart('createOperator', operatorId, operatorData);
  }

  addNewOperator4() {

    var operatorId = 'created_operator_' + this.operatorI;
    var operatorData = {
      top: this.cx,
      left: this.cy,
      properties: {
        title: 'خروجی',
        class: 'output_circle',
        inputs: {
          input_1: {
            label: ' ',
          },
          input_2: {
            label: ' ',
          },


        },
        outputs: {

        }
      }
    }

    this.operatorI++;
    $(this.exampleDiv.nativeElement).flowchart('createOperator', operatorId, operatorData);
  }

  addNewOperator5() {

    var operatorId = 'created_operator_' + this.operatorI;
    var operatorData = {
      top: this.cx,
      left: this.cy,
      properties: {
        title: 'IF',
        class: 'if_triangle',
        inputs: {
          input_1: {
            label: ' ',
          },
          input_2: {
            label: ' ',
          },


        },
        outputs: {
          output_1: {
            label: ' ',
          },
        }
      }
    }

    this.operatorI++;
    $(this.exampleDiv.nativeElement).flowchart('createOperator', operatorId, operatorData);
  }


  deleteOperationOrLink() {
    $(this.exampleDiv.nativeElement).flowchart('deleteSelected');
  }

  load() {
    $(this.exampleDiv.nativeElement).flowchart('deleteSelected');
    var data = JSON.parse(this.diagModel);
    $(this.exampleDiv.nativeElement).flowchart('setData', data);
  }


  get() {
    $(this.exampleDiv.nativeElement).flowchart('deleteSelected');
    var data = $(this.exampleDiv.nativeElement).flowchart('getData');
    this.diagModel = JSON.stringify(data, null, 2);

  }

  changeOperator(){
    //$element.text() = "sss";
    //console.log(this.contactType.values);


  }


//macd_p1;
//macd_p2;




  setInput(selectedValue){
    console.log('The selected input is:' , selectedValue);
    switch(selectedValue){
      case 'وبملت':
        pricess = this.mellat;
        this.label1 = 'نام سهام: بانک ملت';
        break;
      case 'خودرو':
        pricess = this.khodro;
        this.label1 = 'نام سهام: ایران خودرو ';
        break;
      case 'شپنا':
        pricess = this.shepna;
        this.label1 = 'نام سهام: پالایش نفت اصفهان ';
        break;
      default: 
        break;

    }
  }

  setRsi(selectedValue){
    console.log('The RSI period is:' , selectedValue);
    periodd = selectedValue;
    this.label2 = ' نام اندیکاتور:  RSI';
    this.label3 = ' دوره زمانی: ' + periodd + 'روزه';
    rsi_result = rsi({period: periodd, values: pricess});
    console.log('The RSI result is:' ,  rsi_result);
  }

  setMacd(selectedValue1, selectedValue2){
    console.log('The MACD period one is:' , selectedValue1);
    console.log('The MACD period two is:' , selectedValue2);
    this.label2 = 'نام اندیکاتور:  MACD';
    periodd  = selectedValue1;
    this.label3 = ' دوره زمانی: ' + periodd + ' روزه';
    //this.macd_p2 = selectedValue2;
    this.doMacd(periodd, pricess);
  }



  doMacd(periodd , pricess){
    macd_result = sma({period: periodd, values: pricess});
    console.log('sma result is:' , macd_result );
  }

  doOutput(){
    this.dialog.open(NgxChartsComponent ) ; //, {width: '500px', height: '500px'});
    
  }




}

export const RSI_RESULT = rsi_result;
export const MACD_RESULT = macd_result;
