import {Component, ElementRef} from '@angular/core';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
  animations: [
    trigger('iconbool', [
      state('false', style({
        transform: 'rotate(0)'
      })),
      state('true',   style({
        transform: 'rotate(180deg)'
      })),
      transition('false => true', animate('1000ms ease-in', keyframes([
        style({transform: 'scale(1)', offset: 0}),
        style({transform: 'scale(0.7) rotate(15deg)', offset: 0.15}),
        style({transform: 'scale(1)', offset: 0.3}),
        style({transform: 'scale(4.2)', offset: 1})
      ]))),
      transition('true => false', animate('1000ms ease-out', keyframes([
        style({transform: 'scale(1)', offset: 0}),
        style({transform: 'scale(0.7) rotate(15deg)', offset: 0.15}),
        style({transform: 'scale(1)', offset: 0.3}),
        style({transform: 'scale(4.2)', offset: 1})
      ])))
    ])
  ]
})
export class AppComponent {

  constructor(private _eref:ElementRef){}

  links: any[] = ['Dashboard',
                  ['Project','BOQ','Project Hierarchy'],
                  ['Purchase Order','Request For Quotation','Supplier Quotation'],
                  ['Site','Indent'],
                  'Accounts',
                  'Finance',
                  ['HR','Register New Employee','Attendence Sheet','Performace Stats'],
                  ];
  up: any[] = [false,
               [false,false, false],
               [false,false,false],
               [false,false],
               false,
               false,
               [false,false,false,false],
               ];

  linkJson:any[]=[{},
                  {},
                  {}]

  userBool:boolean;
    onClick(event) {
        console.log(event.target)
     if (!this._eref.nativeElement.contains(event.target)){
       this.userBool=false;
       console.log(false)
     } // or some similar check
    }
}
