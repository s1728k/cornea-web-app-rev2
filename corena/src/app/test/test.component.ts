import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  side_nav_hide:boolean=false;
  side_nav_width:string;

  constructor() { }

  ngOnInit() {
  }

  sideNavToggle(){
    if (this.side_nav_hide){
      this.side_nav_hide=false;
      this.side_nav_width='200px';
    }else{
      this.side_nav_hide=true
      this.side_nav_width='40px';
    }
  }

}
