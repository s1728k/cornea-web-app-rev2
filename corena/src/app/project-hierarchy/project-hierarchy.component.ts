import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-project-hierarchy',
  templateUrl: './project-hierarchy.component.html',
  styleUrls: ['./project-hierarchy.component.css']
})
export class ProjectHierarchyComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

    public org_ChartData = [
        ['id', 'Manager', 'ToolTip'],
        [{ id:1, v: 'Mike', f: 'Mike<div style="color:red; font-style:italic">President</div>' },
            '', 'The President'],
        [{ v: 'Jim', f: 'Jim<div style="color:red; font-style:italic">Vice President</div>' },
            'Mike', 'VP'],
        ['Alice', 1, ''],
        ['Bob', 'Jim', 'Bob Sponge'],
        ['Bob', 'Alice', 'Bob Sponge'],
        ['Carol', 'Bob', '']
    ];

    public org_ChartOptions = {
        allowHtml: true
    };


}
