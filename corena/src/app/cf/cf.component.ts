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
import * as Constants from '../shared/constants.globals';
import {DialogService} from '../shared/services/dialog.service';
import {LoaderService} from 'app/shared/services/loader.service';


@Component({
  selector: 'app-cf',
  templateUrl: './cf.component.html',
  styleUrls: ['./cf.component.css'],
  providers: [DialogService]
})

export class CfComponent implements OnInit {
  newMaterial: {} = {};
  subMaterials: {}[] = [];
  materialsList: {}[];
  rowsToDisplay: {}[];
  searchOpt: {} = {brand: '', modal: '', job: ''};

  lastSearchObj: {} = {};
  pageCount = 4;
  perPageCount = 2;
  activePage = 0;
  public result: any;

  private materials: Observable<{}[]>;
  private searchTerms: Subject<string> = new Subject<string>();

  constructor(private restApiService: RestApiService, private _http: Http, private dialogsService: DialogService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.materials = this.searchTerms
      .debounceTime(300)        // wait 300ms after each keystroke before considering the term
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => this.restApiService.search(term))
      .catch(error => {
        console.log(error);
        return Observable.of<{}>([]);
      });

    this.getMaterials(0);
  }

  search(term1: string, cnd: string): void {
    this.searchTerms.next(term1);
    this.restApiService.getRequest('http://49.50.76.29/api/material/search?search='
      + term1 + '&filter[]=name&filter[]=srno&filter[]=brand' + cnd)
      .map(res => res.json().data)
      .subscribe(
        (value) => {
          this.materialsList = value;
        },
        (err: any) => {
          console.log(err);
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
        });
  }

  addSubMaterial({} = {}) {
    this.subMaterials.push({});
  }

  delSubMaterial(i) {
    this.subMaterials.splice(i, 1);
  }

  updateRow(material, i) {
    this.subMaterials[i]['uom'] = material['uom'];
    this.subMaterials[i]['price'] = material['rate'];
    this.subMaterials[i]['srno'] = material['srno'];
  }

  cfMaterial: string;
  ed: {} = {};

  loadEdit(item) {
    this.newMaterial = item;
    this.subMaterials = item['submaterials'];
    this.cfMaterial = item['material']['name']
    this.ed['edit'] = true;
  }

  resetNew() {
    this.newMaterial = {};
    this.subMaterials = [];
    this.cfMaterial = "";
  }

  perPageCountChange(perPageCount) {
    console.log(perPageCount)
    this.perPageCount = perPageCount;
    this.getMaterials(0);
  }

  getPageCount(sTerm: string, fltr: string): void {
    const url = 'http://49.50.76.29/api/cf/search?search=' + sTerm + '&' + fltr + '&hidden[]=pivot&perPage=10&page=0';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().total)
      .subscribe(
        (value: any) => {
          this.pageCount = value;
          console.log(this.pageCount);
        },
        (err: any) => {
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
          console.error(err);
        }
      );
    console.log(this.pageCount);
  }

  selPage(p) {
    this.activePage = p;
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
    this.lastSearchObj = {'from': 'start', '1': n};

    const fltr = '&filter[]=cf_price&filter[]=item_id&filter[]=uom&filter[]=type&filter[]=price&filter[]=description&appends[]=material&appends[]=submaterials'

    const url = 'http://49.50.76.29/api/cf/search?search=' + fltr + '&hidden[]=pivot&perPage=' + String(this.perPageCount) + '&page=' + String(n);
    console.log(url)
    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: { 'material': { 'name': 1 } }[]) => {
          this.rowsToDisplay = value;
          console.log(n);
          console.log(this.rowsToDisplay);
          this.loaderService.display(false);
        },
        (err: any) => {
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
          console.error(err);
        }
      );
    this.getPageCount('', fltr);
  }

  postMaterial() {
    const url = 'http://49.50.76.29/api/cf/new';
    console.log(this.newMaterial);
    this.newMaterial['srno'] = "";
    this.newMaterial['submaterials'] = this.subMaterials;
    console.log(this.newMaterial['subMaterials']);
    this.restApiService.postRequest(url, this.newMaterial)
      .map(res => res.json().data[0])
      .subscribe(
        (value: {}) => {
          this.newMaterial = value;
          console.log(this.newMaterial);
          this.newMaterial = {};
          this.subMaterials = [];
          this.cfMaterial = "";
          this.selPage(this.activePage);
        },
        (err: any) => {
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
          console.error(err);
        }
      );
  }

  putMaterial() {
    console.log(this.subMaterials);
    const url = 'http://49.50.76.29/api/cf/' + String(this.newMaterial['id']);
    this.newMaterial['submaterials'] = this.subMaterials;
    this.restApiService.putRequest(url, this.newMaterial)
      .map(res => res.json().data)
      .subscribe(
        (value: any) => {
          this.newMaterial = value;
          console.log(value);
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
        }
      );
  }

  deleteMaterial(material) {
    const url = 'http://49.50.76.29/api/cf/' + String(material.id);

    this.restApiService.deleteRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: any) => {
          this.newMaterial = value;
          console.log(value);
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
        }
      );
  }

  updateFilter(event, n) {
    console.log(n)
    let val
    if (event) {
      val = event.target.value.toLowerCase();
    } else {
      val = ""
    }

    this.lastSearchObj = {'from': 'full', '1': val, '2': n};

    const fltr = '&filter[]=cf_price&filter[]=item_id&filter[]=uom' +
      '&filter[]=type&filter[]=price&filter[]=description&hidden[]=pivot'

    const url = 'http://49.50.76.29/api/cf/search?search=' + fltr + '&perPage=' + String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.rowsToDisplay = value;
          console.log(this.rowsToDisplay);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
        }
      );
    this.getPageCount(val, fltr);
  }

  updateFilter1(sParam, k, n) {
    this.lastSearchObj = {'from': 'ind', '1': sParam, '2': k, '3': n};
    const url = 'http://49.50.76.29/api/cf/search?search=' + sParam[k] +
      '&filter[]=' + k + '&hidden[]=pivot&perPage=' +
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
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
        }
      );
    this.getPageCount(sParam[k], 'filter[]=' + k);
  }

  tcf_price: {} = {}
  keys: any[] = []

  cf_priceCalc(i) {
    if (this.subMaterials[i]['uom'] === 'cft') {
      this.subMaterials[i]['cf_price'] = this.subMaterials[i]['rate'] / 304.8 / this.subMaterials[i]['type']
    } else {
      this.subMaterials[i]['cf_price'] = this.subMaterials[i]['rate']
    }
    this.tcf_price = {}
    for (let i = 0; i < this.subMaterials.length; i++) {
      this.tcf_price[this.subMaterials[i]['type']] = 0;
    }
    this.grandTotal();
    this.keys = [];
    for (let key in this.tcf_price) {
      this.keys.push(key);
    }
  }

  grandTotal() {
    for (var i = 0; i < this.subMaterials.length; i++) {
      if (this.tcf_price[this.subMaterials[i]['type']]) {
        this.tcf_price[this.subMaterials[i]['type']] = this.tcf_price[this.subMaterials[i]['type']] + this.subMaterials[i]['cf_price'];
      } else {
        this.tcf_price[this.subMaterials[i]['type']] = this.subMaterials[i]['cf_price'];
      }
    }
  }

}
