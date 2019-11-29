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


declare var $: any;


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



  @ViewChild('exampleDiv',{static:true}) exampleDiv: ElementRef;



  constructor() {
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
        title: 'عملگر یک ' , // + (this.operatorI + 1),
        class: 'myTest',
        inputs: {
          input_1: {
            label: 'ورودی اول',
          },
          input_2: {
            label: 'ورودی دوم',
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
        title: ' عملگر دو ' , // + (this.operatorI + 1),
        class: 'myTest2',
        inputs: {
          input_1: {
            label: 'ورودی اول',
          },
          input_2: {
            label: 'ورودی دوم',
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
        title: 'ورودی ' ,
        class: ' input_circle',
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
        class: ' output_circle',
        inputs: {
          input_1: {
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

}

