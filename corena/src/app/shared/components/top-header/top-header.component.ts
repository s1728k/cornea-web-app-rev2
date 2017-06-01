import {Component, OnInit, ViewChild, ViewChildren, QueryList, ElementRef} from '@angular/core';
import { RouterModule, Router }  from '@angular/router';

@Component({
  selector: 'app-top-header',
  templateUrl: './top-header.component.html',
  styleUrls: ['./top-header.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class TopHeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
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

  routingFun(){
      this.router.navigate(['/login']);
  }

}
