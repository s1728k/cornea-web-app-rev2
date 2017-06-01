import {Component, ViewChild, ViewChildren, QueryList, ElementRef} from '@angular/core';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';
import { SharedService } from './shared.service';

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

  constructor(private sharedService: SharedService){}

  links: any[] = ['Dashboard',
                  ['Project', 'BOQ', 'Project Hierarchy'],
                  ['Purchase Order', 'Request For Quotation', 'Supplier Quotation'],
                  ['Site', 'Indent'],
                  'Accounts',
                  'Finance',
                  ['HR', 'Register New Employee', 'Attendence Sheet', 'Performance Stats'],
                  ];
  up: any[] = [false,
               [false, false, false],
               [false, false, false],
               [false, false],
               false,
               false,
               [false, false, false, false],
               ];

  linkJson: any[]= [{},
                  {},
                  {}];

 // -------------------------------------------------------------------------
  @ViewChild('userpop') div: ElementRef;
  @ViewChild('userimg') img: ElementRef;
  userBool: boolean;
  loginBool= false;
  onClick(event) {
   if (!this.div.nativeElement.contains(event.target) && this.img.nativeElement !== event.target){
     this.userBool = false;
   }
   //this.loginBool = this.sharedService.loginBool;
  }

}
