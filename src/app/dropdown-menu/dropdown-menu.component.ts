import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger, keyframes } from '@angular/animations';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.css'],
  animations:[
    
    trigger('fade', [

      state('show', style({opacity:1})),
      state('hide', style({opacity:1, transform: 'translateX(-100px)'})),
      transition('show <=> hide', animate('90ms'))

    ]),
  
    trigger('exitAnimation', [
      state('show', style({opacity:1})),
      state('hide', style({opacity:1, transform: 'translateX(-100px)'})),
      transition('show <=> hide', animate('90ms'))

    ]),

    trigger('press', [

      transition('* <=> in', animate(1000, keyframes([
        style({transform: 'scale(.94)', offset: 0}),
        style({transform: 'scale(1)', offset: 0.2}),
      ])))

    ]),


    trigger('exit-sign', [

      state('x', style({opacity:1, backgroundColor: 'red', offset:1})),
      transition('* <=> x', animate('100ms'))

    ])

  ]

  
})
export class DropdownMenuComponent{

  opened = false;
  show = false;
  push = false;
  push1 = false;
  push2 = false;
  push3 = false;
  push4 = false;
  push5 = false;
  push6 = false;

  get stateName(){
    return !this.opened ? 'show' : 'hide'
  }
  get exitState(){
    return this.opened ? 'show' : 'hide'
  }

  get exitSignColor(){
    return this.opened ? 'x' : '*'
  }

  get stateTrigger(){
    return this.push ? '*' : 'in'
  }
  get stateTrigger1(){
    return this.push1 ? '*' : 'in'
  }
  get stateTrigger2(){
    return this.push2 ? '*' : 'in'
  }
  get stateTrigger3(){
    return this.push3 ? '*' : 'in'
  }
  get stateTrigger4(){
    return this.push4 ? '*' : 'in'
  }
  get stateTrigger5(){
    return this.push5 ? '*' : 'in'
  }
  get stateTrigger6(){
    return this.push6 ? '*' : 'in'
  }
}
