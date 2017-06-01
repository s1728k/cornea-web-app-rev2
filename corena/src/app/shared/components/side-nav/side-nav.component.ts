import { Component, OnInit } from '@angular/core';
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';
import { RouterModule, Router }  from '@angular/router';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css'],
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
export class SideNavComponent implements OnInit {

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

  constructor(private router:Router) { }

  ngOnInit() {
  }

  routingFun(i,j){
      // console.log(i)
      // console.log(j)
      if (i===1 && j===1){
          this.router.navigate(['/boq-upload']);
      }
      if (i===1 && j===2){
          this.router.navigate(['/project-hierarchy']);
      }
  }

}
