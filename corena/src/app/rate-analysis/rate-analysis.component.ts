import { RestApiService } from '../services/rest-api-service.service';
import { Component, OnInit } from '@angular/core';
import { RateAnalysis, LineItemTableRow } from '../model/class';
import { LineItem } from '../model/class/line-item.model';
import { NanPipe } from '../nan.pipe';
import { SearchService } from '../services/search.service'

import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-rate-analysis',
  templateUrl: './rate-analysis.component.html',
  styleUrls: ['./rate-analysis.component.css']
})
export class RateAnalysisComponent implements OnInit {

  boqObj:{}={};
  materials: Observable<{}[]>;

  private searchTerms = new Subject<string>();

  calcs1: RateAnalysis[][] = [];
  calcs2: RateAnalysis[] = [];
  // calcs3: RateAnalysis[][]=[];

  // old variable to be removed when api call is made it doesnt affeect anything
  rowItemsOld: LineItemTableRow[]= [{'id': 1, 'name': 'item1'}, {'id': 2, 'name': 'item2'},
                                    {'id': 3, 'name': 'item3'}, {'id': 4, 'name': 'item4'}];

  // variable for LineItem
  rowItems: LineItem[];

  // variable for grand total one for item rate analysis and other for overhead.
  grandTotalV: any;
  grandTotal2V: any;

  // dummy data list for dropdown for material
  dropList1: {}[]= [{'key': 'value1'}, {'key': 'value2'}, {'key': 'value3'}, {'key': 'value4'}];
  dropList2: {}[]= [{'key': 'value1'}, {'key': 'value2'}, {'key': 'value3'}, {'key': 'value4'}];
  filteredStates:any[]=["sfsdF","fsdfs",'dfsfsdf']


  constructor(private restApiService: RestApiService, private searchService:SearchService) { }

  // Push a search term into the observable stream.
  search(term: string): void {
    console.log(term)
    this.searchTerms.next(term);
    this.materials = this.searchTerms
                      .debounceTime(300)
                      .distinctUntilChanged()
                      .switchMap((term: string) => this.restApiService.search(term));
                      // .switchMap(term => this.restApiService.search(term))
                      .subscribe((result) => {
                          this.materials = result;
                          console.log(this.materials);
                      });

    console.log(this.materials);
  }

  ngOnInit() {
    this.boqObj=this.restApiService.comm_obj
    console.log(this.boqObj['lineItems'])
  }

  src(){
    this.materials = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time the term changes
        // return the http search observable
        ? this.restApiService.search(term)
        // or the observable of empty heroes if there was no search term
        : Observable.of<{}>([]))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<{}>([]);
      });
      console.log(this.materials);
  }

  increment1() {
    this.calcs1.push([]);
  }
  deleteTable1(i) {
     this.calcs1.splice(i, 1);
  }
  addRow1(i) {
    this.calcs1[i].push({});
  }
  deleteRow1(i, j) {
    this.calcs1[i].splice(j, 1);
  }

  // get api request for line item
  getLineItems(id) {
    const url = '';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: LineItem[]) => {
          this.rowItems = value;
        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log('data returned %s', this.rowItems);
  }

  // get api request for material names
  selRowItemId(id) {

  }


  // ----clicking the grandTotal button will calculate the grandtotal as there need to have for loop---

  grandTotal(j) {
    this.grandTotalV = 0;
    for (let i = this.calcs1[j].length - 1; i >= 0; i--) {
      this.grandTotalV = this.grandTotalV + +this.calcs1[j][i]['v1'] * +this.calcs1[j][i]['v2'] * +this.calcs1[j][i]['v3']
        * 0.0012 * 8000 * +this.calcs1[j][i]['v4'];
    }
  }


  // increment2() {
  //   this.calcs2.push([])
  // }
  // deleteTable2(i) {
  //    this.calcs2.splice(i, 1);
  // }
  addRow2(i) {
    this.calcs2.push({});
  }
  deleteRow2(i, j) {
    this.calcs2.splice(j, 1);
  }

// ----clicking the grandTotal button will calculate the grandtotal as there need to have for loop---

  grandTotal2() {
    this.grandTotal2V = 0;
    for (let i = this.calcs2.length - 1; i >= 0; i--) {
      this.grandTotal2V = this.grandTotal2V + this.calcs2[i]['v1'] * this.calcs2[i]['v2'] * this.calcs2[i]['v3'];
    }
  }

  // increment3() {
  //   this.calcs3.push([])
  // }
  // deleteTable3(i) {
  //    this.calcs3.splice(i, 1);
  // }
  // addRow3(i) {
  //   this.calcs3[i].push({})
  // }
  // deleteRow3(i,j) {
  //   this.calcs3[i].splice(j, 1);
  // }

}

