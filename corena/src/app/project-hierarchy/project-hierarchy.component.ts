import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-hierarchy',
  templateUrl: './project-hierarchy.component.html',
  styleUrls: ['./project-hierarchy.component.css']
})
export class ProjectHierarchyComponent implements OnInit {
  public org_ChartData = [
    ['Name', 'Manager', 'ToolTip'],
    [{v: 'Mike', f: 'Mike<div style="color:red; font-style:italic">President</div>'},
      '', 'The President'],
    [{v: 'Jim', f: 'Jim<div style="color:red; font-style:italic">Vice President</div>'},
      'Mike', 'VP'],
    [{v: 'Jim', f: 'Jim<div style="color:red; font-style:italic">Vice President</div>'},
      'Mike', 'VP'],
    ['Alice', 'Mike', ''],
    ['Bob', 'Jim', 'Bob Sponge'],
    ['Carol', 'Bob', '']
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
