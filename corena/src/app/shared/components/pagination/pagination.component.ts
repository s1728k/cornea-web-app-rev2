import {Component, Input, Output, EventEmitter, OnInit, OnChanges} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {

  Pages: number[];
  fPage: number;
  lPage: number;
  vPages: number=10;
  clActive:boolean[]=[];
  pageSelOld: number=0;
  countPerPage: number=2;
  goToPage: number=1;
  @Input() pageCount: number;
  @Output() pageSelected = new EventEmitter();
  @Output() perPageCount = new EventEmitter();
  loadPage(page: number){
      this.goToPage=page+1;
      this.pageSelected.emit(page);
      this.clActive[this.pageSelOld]=false;
      this.clActive[page]=true;
      this.pageSelOld = page;
  }

  constructor(){}
  ngOnInit() {
      this.Pages = Array(Math.ceil(this.pageCount / this.countPerPage)).fill(4).map((x, i) => i);
      this.fPage = 0;
      this.lPage = this.Pages.length>this.vPages?this.vPages-1:this.Pages.length-1;
      for (const p of this.Pages){
          this.clActive.push(false);
      }
      this.clActive[0]=true;
      this.pageSelOld = 0;
  }
  ngOnChanges() {
    this.Pages = Array(Math.ceil(this.pageCount / this.countPerPage)).fill(4).map((x, i) => i);
    this.fPage = 0;
    this.lPage = this.Pages.length>this.vPages?this.vPages-1:this.Pages.length-1;
    for (var i = 0; i < this.Pages.length; i++) {
      if (i>this.clActive.length-1){
        this.clActive.push(false);
      }else{
        this.clActive[i]=false;
      }
      this.Pages[i]
    }
    this.clActive[0]=true;
    this.pageSelOld = 0;
  }

  refreshPagination(newCountPerPage) {
    for (var i = 0; i < this.clActive.length; i++) {
      this.clActive[i]=false
    }
    this.countPerPage=newCountPerPage;
    this.ngOnChanges();
    this.perPageCount.emit(newCountPerPage)
  }

  refreshVpages(iPage){
    iPage = iPage<0?0:iPage;
    iPage = iPage>this.Pages.length-1?this.Pages.length-1:iPage;
    this.loadPage(iPage);
    if(iPage<this.fPage){
      this.fPage=iPage;
      this.lPage=this.fPage+this.vPages-1
    }
    if(iPage>this.lPage){
      this.fPage=iPage-this.vPages+1;
      this.lPage=iPage
    }
  }

}
