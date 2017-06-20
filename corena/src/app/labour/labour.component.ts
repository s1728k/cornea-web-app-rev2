import { Component, OnInit, AfterViewInit } from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';

// ----Models Used-------------
import {Labour} from '../model/class/labour.model'

// ------------http imports-------------------------------
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.css']
})
export class LabourComponent implements OnInit, AfterViewInit {

  labours: Observable<Labour[]>;
  searchLoad:Subject<string> = new Subject<string>(); // subject used to monitor labours observable
  searchTotal:Subject<string> = new Subject<string>(); // subject used to monitor total count of labours

  uomList: {}[]= ['hourly', 'daily', 'monthly']; // for Dropdown select purpose
  typeList: any[]= ['Internal', 'Contract']; // for Dropdown select purpose
  searchOpt: {}= {brand: '', modal: '', job: ''}; // empty object used to pass the individual column searched for
  ed: {}= {}; // boolean for editing mode
  lastSearchObj: {}= {}; // used as a token to identify request is comming from normal get request or general search or individual search
  trig:string=""; // manual trigger the searchLoad and searchTotal
  pageCount= 4;
  perPageCount= 2;
  activePage=0;

  newLabour: Labour= new Labour();
  //labours: Labour[];

  constructor(private restApiService: RestApiService) { }

  ngOnInit() {
    this.labours = this.searchLoad
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.restApiService.search(term))
      .catch(error => {
        // TODO: add real error handling
        console.log(error);
        return Observable.of<Labour[]>([]);
      });

    this.searchTotal
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap((term)=> this.restApiService.getLength(term))
      .subscribe((value)=>{this.pageCount = value; console.log(this.pageCount)})

  }

  ngAfterViewInit(){
    // console.log("ngAfterViewInit")
    this.getLabours(0);
    this.activePage=0
  }

  perPageCountChange(perPageCount) {
    // console.log("Entered page count change")
    // console.log(perPageCount)
    this.perPageCount=perPageCount;
    this.getLabours(0);
    this.activePage=0
  }

  selectPage(p){
    // console.log("Entered select page")
    this.trig=(this.trig==='sel')?this.trig+"1":'sel'
    console.log(p)
    // console.log(this.lastSearchObj['from'])
    this.activePage=p;
    switch (this.lastSearchObj['from']) {
      case "full":
        this.generalFilter(this.lastSearchObj['1'], p);
        break;

    case "ind":
        this.individualFilter(this.lastSearchObj['1'], this.lastSearchObj['2'], p)
        break;

    case "start":
        this.getLabours(p)
        break;

      default:
        // code...
        break;
    }
  }

  // getPageCount(url) {
  //   // console.log("Entered getPageCount")
  //   this.restApiService.getRequest(url)
  //     .map(res => res.json().total)
  //     .subscribe(
  //       (value) => {
  //         this.pageCount = value;
  //         console.log(this.pageCount)
  //       },
  //       (err: any) => {
  //         console.error(err);
  //       }
  //     );
  // }

  getLabours(n) {
    console.log("Entered get labours")
    // console.log(n)
    this.lastSearchObj = {'from':'start','1':n};

    let url = 'http://49.50.76.29/api/labour/search?search=&filter[]=name&filter[]=srno&filter[]=uom&filter[]=category&filter[]=age&filter[]=type&filter[]=rate&perPage=' +
                String(this.perPageCount) + '&page=' + String(n)+"&"+this.trig;

    this.searchLoad.next(url);

    url = 'http://49.50.76.29/api/labour/search?search=&filter[]=name&filter[]=srno&filter[]=uom&filter[]=category&filter[]=age&filter[]=type&filter[]=rate&perPage=' +
                String(1) + '&page=' + String(0)+"&"+this.trig;

    this.searchTotal.next(url);
    // this.getPageCount(url);
  }

  postLabour() {
    // console.log("Entered post labour")
    const url = 'http://49.50.76.29/api/labour/new';
    this.newLabour['srno']="";
    // console.log(this.newLabour);
    this.restApiService.postRequest(url, this.newLabour)
      .map(res => res.json().data[0])
      .subscribe(
        (value: Labour) => {
          this.newLabour = value;
          console.log(this.newLabour);
          this.newLabour= new Labour;
          this.selectPage(this.activePage)
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  putLabour(labour) {
    // console.log("Entered put labour")
    // console.log(labour)
    const url = 'http://49.50.76.29/api/labour/' + String(labour.id);
    // console.log(labour)
    this.restApiService.putRequest(url, labour)
      .map(res => res.json().data)
      .subscribe(
        (value: Labour) => {
          this.newLabour = value;
          // console.log(this.newLabour)
          this.selectPage(this.activePage)
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  deleteLabour(labour) {
    // console.log("Entered delete labour")
    // console.log(labour)
    const url = 'http://49.50.76.29/api/labour/' + String(labour.id);

    this.restApiService.deleteRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: Labour) => {
          this.newLabour = value;
          // console.log(this.newLabour)
          this.selectPage(this.activePage)
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  generalFilter(event, n) {
    // console.log("Entered general filter")
    let val
    if (event){
      val = event.target.value.toLowerCase();
    }else{
      val = ""
    }
    // console.log(val)
    // console.log(n)
    this.trig="";

    this.lastSearchObj = {'from':'full','1':val, '2':n};

    let url = 'http://49.50.76.29/api/labour/search?search='+val+
                '&filter[]=name&filter[]=srno&filter[]=uom&filter[]=category&filter[]=age&filter[]=type&filter[]=rate&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.searchLoad.next(url)

    url = 'http://49.50.76.29/api/labour/search?search='+val+
                '&filter[]=name&filter[]=srno&filter[]=uom&filter[]=category&filter[]=age&filter[]=type&filter[]=rate&perPage=' +
                String(1) + '&page=' + String(0);

    this.searchTotal.next(url)

  }

  individualFilter(sParam, k, n){
    // console.log("Entered individual filter")
    // console.log(sParam)
    // console.log(k)
    // console.log(n)
    this.trig="";

    this.lastSearchObj = {'from':'ind','1':sParam, '2':k, '3':n};

    let url = 'http://49.50.76.29/api/labour/search?search='+ sParam[k] +
                '&filter[]='+ k +'&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);


    this.searchLoad.next(url)


    url = 'http://49.50.76.29/api/labour/search?search='+ sParam[k] +
                '&filter[]='+ k +'&perPage=' +
                String(1) + '&page=' + String(0);

    this.searchTotal.next(url)

  }

}
