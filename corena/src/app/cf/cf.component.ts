import {RestApiService} from '../services/rest-api-service.service';
import {Component, OnInit} from '@angular/core';
import {RateAnalysis, LineItemTableRow} from '../model/class';
import {LineItem} from '../model/class/line-item.model';
import {NanPipe} from '../shared/pipes/nan.pipe';
import {MdDialog, MdDialogRef} from '@angular/material';
// import {RaPopupDialog} from './rapopup.component';


import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import {FormControl} from '@angular/forms';
import {Http} from '@angular/http';


@Component({
  selector: 'app-cf',
  templateUrl: './cf.component.html',
  styleUrls: ['./cf.component.css']
})

export class CfComponent implements OnInit {
  newMaterial:{}={};
  subMaterials:{}[]=[];
  materialsList: {}[];
  rowsToDisplay: {}[];
  searchOpt: {}= {brand: '', modal: '', job: ''};
  ed: {}= {};
  lastSearchObj: {}= {};
  pageCount= 4;
  perPageCount= 2;
  activePage=0;

  private materials: Observable<{}[]>;
  private searchTerms: Subject<string> = new Subject<string>();

  constructor(private restApiService: RestApiService, private _http: Http) { }

  ngOnInit() {
      this.materials = this.searchTerms
         .debounceTime(300)        // wait 300ms after each keystroke before considering the term
         .distinctUntilChanged()   // ignore if next search term is same as previous
          .switchMap(term => this.restApiService.search(term))
          .catch(error => {console.log(error); return Observable.of<{}>([]);});

    this.getMaterials(0);
  }

  search(term1: string, cnd: string): void {
    this.searchTerms.next(term1);
    this.restApiService.getRequest('http://49.50.76.29/api/material/search?search='
      + term1 + '&filter[]=name&filter[]=srno&filter[]=brand' + cnd)
      .map(res => res.json().data)
      .subscribe(
        (value) => {this.materialsList=value;},
        (err: any) => console.log(err)
      );
  }

  addSubMaterial({}={}) {
    this.subMaterials.push({});
  }

  delSubMaterial(i) {
    this.subMaterials.splice(i, 1);
  }

  updateRow(material,i) {
      this.subMaterials[i]['uom']=material['uom'];
      this.subMaterials[i]['price']=material['rate'];
      this.subMaterials[i]['srno']=material['srno'];
  }

  cfMaterial:string;
  loadEdit(item) {
      this.newMaterial=item['material'];
      this.subMaterials=item['submaterials'];
      this.cfMaterial=item['material']['name']
  }

  perPageCountChange(perPageCount) {
    console.log(perPageCount)
    this.perPageCount=perPageCount;
    this.getMaterials(0);
  }

  getPageCount(sTerm: string, fltr: string): void{
    const url = 'http://49.50.76.29/api/cf/search?search='+ sTerm +'&' + fltr + '&hidden[]=pivot&perPage=10&page=0';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().total)
      .subscribe(
        (value: any) => {
          this.pageCount = value;
          console.log(this.pageCount);
        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log(this.pageCount);
  }

  selPage(p){
    this.activePage=p;
    switch (this.lastSearchObj['from']) {
      case "full":
        this.updateFilter(this.lastSearchObj['1'], p);
        break;

    case "ind":
        this.updateFilter1(this.lastSearchObj['1'], this.lastSearchObj['2'], p)
        break;

    case "start":
        this.getMaterials(p)
        break;

      default:
        // code...
        break;
    }
  }

  getMaterials(n) {
    this.lastSearchObj = {'from':'start','1':n};

    const fltr = '&filter[]=cf_price&filter[]=item_id&filter[]=uom&filter[]=type&filter[]=price&filter[]=description&appends[]=material&appends[]=submaterials'

    const url = 'http://49.50.76.29/api/cf/search?search='+fltr+'&hidden[]=pivot&perPage=' + String(this.perPageCount) + '&page=' + String(n);
    console.log(url)
    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.rowsToDisplay = value;
          console.log(n);
          console.log(this.rowsToDisplay);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount('',fltr);
  }

  postMaterial() {
    const url = 'http://49.50.76.29/api/cf/new';
    console.log(this.newMaterial);
    this.newMaterial['srno']="";
    this.newMaterial['submaterials']=this.subMaterials;
    console.log(this.newMaterial['subMaterials']);
    this.restApiService.postRequest(url, this.newMaterial)
      .map(res => res.json().data[0])
      .subscribe(
        (value: {}) => {
          this.newMaterial = value;
          console.log(this.newMaterial);
          this.newMaterial={};
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
        }
      );
  }

  putMaterial(material) {
    const url = 'http://49.50.76.29/api/material/' + String(material.id);

    this.restApiService.putRequest(url, material)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: any) => {
          this.newMaterial = value;
          console.log(value);
          this.selPage(this.activePage);
          // this.materialListDb.push(this.newMaterial);
          // this.rowsToDisplay = this.materialListDb;
          // console.log(this.materialListDb);
        },
        (err: any) => {
          console.error(err);
        }
      );
    // console.log(this.materialListDb);
  }

  deleteMaterial(material) {
    const url = 'http://49.50.76.29/api/material/' + String(material.id);

    this.restApiService.deleteRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: any) => {
          this.newMaterial = value;
          console.log(value);
          this.selPage(this.activePage);
          // this.materialListDb.push(this.newMaterial);
          // this.rowsToDisplay = this.materialListDb;
          // console.log(this.materialListDb);
        },
        (err: any) => {
          console.error(err);
        }
      );
    // console.log(this.materialListDb);
  }

  updateFilter(event, n) {
    console.log(n)
    let val
    if (event){
      val = event.target.value.toLowerCase();
    }else{
      val = ""
    }

    this.lastSearchObj = {'from':'full','1':val, '2':n};

    const fltr = '&filter[]=cf_price&filter[]=item_id&filter[]=uom' +
                '&filter[]=type&filter[]=price&filter[]=description&hidden[]=pivot'

    const url = 'http://49.50.76.29/api/cf/search?search='+fltr+'&perPage=' + String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.rowsToDisplay = value;
          console.log(this.rowsToDisplay);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount(val, fltr);
  }

  updateFilter1(sParam, k, n){
    this.lastSearchObj = {'from':'ind','1':sParam, '2':k, '3':n};
    const url = 'http://49.50.76.29/api/cf/search?search='+ sParam[k] +
                '&filter[]='+ k +'&hidden[]=pivot&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.rowsToDisplay = value;
          console.log(this.rowsToDisplay);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount(sParam[k], 'filter[]='+ k);
  }

}