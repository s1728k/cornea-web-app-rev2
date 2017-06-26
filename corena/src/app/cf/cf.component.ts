import {RestApiService} from '../services/rest-api-service.service';
import {Component, OnInit} from '@angular/core';
import {GlobalRateAnalysis, LineItemTableRow} from '../model/class';
import {LineItem} from '../model/class/line-item.model';
import {NanPipe} from '../shared/pipes/nan.pipe';
import {MdDialog, MdDialogRef} from '@angular/material';
// import {RaPopupDialog} from './rapopup.component';

// --Models Used--------------------
import {CFFactor, SubMaterial} from '../model/class/co-efficiency-factor.model'
import {Material} from '../model/class/material.model'

// --HTTP Service------------------
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
import {DialogService} from '../shared/services/dialog/dialog.service';
import {LoaderService} from '../services/loader/loader.service';

@Component({
  selector: 'app-cf',
  templateUrl: './cf.component.html',
  styleUrls: ['./cf.component.css'],
  providers: [DialogService]
})

export class CfComponent implements OnInit {

  cfMaterial: string;
  ed: {} = {};
  tcf_price: {} = {}
  keys: any[] = []

  searchOpt: {} = {brand: '', modal: '', job: ''};
  lastSearchObj: {} = {};
  pageCount = 4;
  perPageCount = 2;
  activePage = 0;
  trig: string = '';

  materialsDropDown: Material[];

  newCFFactor: CFFactor = new CFFactor();
  cfFactors: CFFactor[];
  public result: any;

  constructor(private restApiService: RestApiService, private _http: Http, private dialogsService: DialogService, private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.getCFFactors(0);
    this.activePage = 0
  }

  search(term1: string, cnd: string): void {
    this.restApiService.getSearchRequest('http://49.50.76.29/api/material/search?search='
      + term1 + '&filter[]=name&filter[]=srno&filter[]=brand' + cnd)
      .map(res => res.json().data)
      .subscribe(
        (value) => {
          this.materialsDropDown = value;
          this.hideLoader();
        },
        (err: any) => {
          console.log(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  // This method is used to hide the loader
  private hideLoader(): void {
    this.loaderService.hide();
  }

  addSubMaterial() {
    if (this.cfMaterial) {
      this.newCFFactor.submaterials.push(new SubMaterial);
    } else {
      alert('Please Select The Material Which Has CF....')
    }
  }

  deleteSubMaterial(i) {
    this.newCFFactor.submaterials.splice(i, 1);
  }

  updateRow(material, i) {
    this.newCFFactor.submaterials[i].uom = material.uom;
    this.newCFFactor.submaterials[i].rate = material.rate;
    this.newCFFactor.submaterials[i].srno = material.srno;
  }

  loadCFFactorForEdit(cfFactor) {
    // this.newCFFactor=cfFactor;
    // this.subMaterials=cfFactor['submaterials'];
    console.log(cfFactor)
    this.newCFFactor = cfFactor
    this.cfMaterial = cfFactor.material.name
    this.ed['edit'] = true;
  }

  loadCfMaterial(material) {
    if (material) {
      this.newCFFactor.item_id = material.id
      this.newCFFactor.price = material.rate
      this.newCFFactor.uom = material.uom
    } else {
      this.newCFFactor = new CFFactor();
    }
  }

  resetNew() {
    this.newCFFactor = new CFFactor();
    // this.subMaterials=[];
    this.cfMaterial = '';
  }

  perPageCountChange(perPageCount) {
    console.log(perPageCount)
    this.perPageCount = perPageCount;
    this.getCFFactors(0);
    this.activePage = 0
  }

  getPageCount(sTerm: string, fltr: string): void {
    const url = 'http://49.50.76.29/api/cf/search?search=' + sTerm + '&' + fltr + '&hidden[]=pivot&perPage=10&page=0';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().total)
      .subscribe(
        (value: any) => {
          this.pageCount = value;
          console.log(this.pageCount);
          this.hideLoader();
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
    console.log(this.pageCount);
  }

  selPage(p) {
    this.activePage = p;
    this.trig = (this.trig === 'sel') ? this.trig + '1' : 'sel'
    switch (this.lastSearchObj['from']) {
      case 'full':
        this.generalFilter(this.lastSearchObj['1'], p);
        break;

      case 'ind':
        this.individualFilter(this.lastSearchObj['1'], this.lastSearchObj['2'], p)
        break;

      case 'start':
        this.getCFFactors(p)
        break;

      default:
        // code...
        break;
    }
  }

  getCFFactors(n) {
    this.lastSearchObj = {'from': 'start', '1': n};

    const fltr = '&filter[]=cf_price&filter[]=item_id&filter[]=uom&filter[]=type&filter[]=price&filter[]=description&appends[]=material&appends[]=submaterials'

    const url = 'http://49.50.76.29/api/cf/search?search=' + fltr + '&hidden[]=pivot&perPage=' + String(this.perPageCount) + '&page=' + String(n);
    console.log(url)
    this.restApiService.getSearchRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: CFFactor[]) => {
          this.cfFactors = value;
          console.log(n);
          console.log(this.cfFactors);
          this.hideLoader();
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
    this.getPageCount('', fltr);
  }

  postCFFactor() {
    const url = 'http://49.50.76.29/api/cf/new';
    console.log(this.newCFFactor);
    this.newCFFactor.srno = '';
    // this.newCFFactor['submaterials']=this.subMaterials;
    console.log(this.newCFFactor.submaterials);
    this.restApiService.postRequest(url, this.newCFFactor)
      .map(res => res.json().data[0])
      .subscribe(
        (value: CFFactor) => {
          this.newCFFactor = value;
          console.log(this.newCFFactor);
          this.newCFFactor = new CFFactor();
          // this.subMaterials=[];
          this.cfMaterial = '';
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  putCFFactor() {
    console.log(this.newCFFactor.submaterials);
    const url = 'http://49.50.76.29/api/cf/' + String(this.newCFFactor.id);
    // this.newCFFactor['submaterials']=this.subMaterials;
    this.restApiService.putRequest(url, this.newCFFactor)
      .map(res => res.json().data)
      .subscribe(
        (value: CFFactor) => {
          this.newCFFactor = value;
          console.log(value);
          this.newCFFactor = new CFFactor();
          this.cfMaterial = '';
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  deleteCFFactor(cfFactor) {
    const url = 'http://49.50.76.29/api/cf/' + String(cfFactor.id);

    this.restApiService.deleteRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: CFFactor) => {
          this.newCFFactor = value;
          console.log(value);
          this.selPage(this.activePage);
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
  }

  generalFilter(event, n) {
    console.log(n)
    let val
    if (event) {
      val = event.target.value.toLowerCase();
    } else {
      val = ''
    }

    this.lastSearchObj = {'from': 'full', '1': val, '2': n};

    const fltr = '&filter[]=cf_price&filter[]=item_id&filter[]=uom&filter[]=type&filter[]=price&filter[]=description&appends[]=material&appends[]=submaterials'

    const url = 'http://49.50.76.29/api/cf/search?search=' + fltr + '&perPage=' + String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getSearchRequest(url)
      .map(res => res.json().data)
      .subscribe(
        (value: CFFactor[]) => {
          this.cfFactors = value;
          console.log(this.cfFactors);
          this.hideLoader();
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
    this.getPageCount(val, fltr);
  }

  individualFilter(sParam, k, n) {
    this.lastSearchObj = {'from': 'ind', '1': sParam, '2': k, '3': n};
    const url = 'http://49.50.76.29/api/cf/search?search=' + sParam[k] +
      '&filter[]=' + k + '&appends[]=material&appends[]=submaterials&hidden[]=pivot&perPage=' +
      String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getSearchRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: CFFactor[]) => {
          this.cfFactors = value;
          console.log(this.cfFactors);
          this.hideLoader();
        },
        (err: any) => {
          console.error(err);
          this.dialogsService
            .errorNotification(err.status)
            .subscribe(res => this.result = res);
        }
      );
    this.getPageCount(sParam[k], 'filter[]=' + k);
  }

  cf_priceCalc(i) {
    if (this.newCFFactor.submaterials[i].uom === 'cft') {
      this.newCFFactor.submaterials[i].cf_price = this.newCFFactor.submaterials[i].rate / (304.8 / this.newCFFactor.submaterials[i].type)
    } else {
      this.newCFFactor.submaterials[i].cf_price = this.newCFFactor.submaterials[i].rate
    }
    this.tcf_price = {}
    for (let i = 0; i < this.newCFFactor.submaterials.length; i++) {
      this.tcf_price[this.newCFFactor.submaterials[i].type] = 0;
    }
    this.grandTotal();
    this.keys = [];
    for (let key in this.tcf_price) {
      this.keys.push(key);
    }
    this.newCFFactor.type = this.keys;
  }

  grandTotal() {
    for (var i = 0; i < this.newCFFactor.submaterials.length; i++) {
      if (this.tcf_price[this.newCFFactor.submaterials[i].type]) {
        this.tcf_price[this.newCFFactor.submaterials[i].type] = this.tcf_price[this.newCFFactor.submaterials[i].type] + this.newCFFactor.submaterials[i].cf_price;
      } else {
        this.tcf_price[this.newCFFactor.submaterials[i].type] = this.newCFFactor.submaterials[i].cf_price;
      }
    }
    this.newCFFactor.cf_price = this.tcf_price;
  }

}
