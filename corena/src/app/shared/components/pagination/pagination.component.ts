import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  Pages: number[];
  bgClr: string[]= [];
  pageSelOld: number;
  @Input() pageCount: number;
  @Input() countPerPage: number;
  @Output() pageSelected = new EventEmitter();
  loadPage(page: number){
      this.pageSelected.emit(page);
      this.bgClr[this.pageSelOld] = 'White';
      this.bgClr[page] = 'grey';
      this.pageSelOld = page;
  }

  constructor(){}
  ngOnInit() {
      //console.log(this.pageCount)
      //console.log(this.countPerPage)
      this.Pages = Array(Math.ceil(this.pageCount / this.countPerPage)).fill(4).map((x, i) => i);
      for (const p of this.Pages){
          this.bgClr.push('White');
      }
      this.bgClr[0] = 'grey';
      //console.log(this.bgClr[0]);
      this.pageSelOld = 0;
  }
  ngOnChanges() {
    console.log(this.pageCount);
    console.log(this.countPerPage);

    this.Pages = Array(Math.ceil(this.pageCount / this.countPerPage)).fill(4).map((x, i) => i);
    for (const p of this.Pages){
      this.bgClr.push('White');
    }
    this.bgClr[0] = 'grey';
    //console.log(this.bgClr[0]);
    this.pageSelOld = 0;
  }

}
