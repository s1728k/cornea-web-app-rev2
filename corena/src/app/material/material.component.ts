import {Component, OnInit} from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';
import {LoaderService} from '../shared/services/loader.service';
import {DialogService} from '../shared/services/dialog.service';
import * as Constants from '../shared/constants.globals';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css'],
  providers: [DialogService]
})
export class MaterialComponent implements OnInit {
  materialList: {}[] = [{id: 1, name: 'Maruthi 800'}, {id: 2, name: 'Jesrsy'}, {id: 3, name: 'Ambzidor'}, {
    id: 4,
    name: 'Jeep'
  }, {id: 5, name: 'BMTC Bus'}];
  brandList: {}[] = [{id: 1, name: 'Maruthi 800'}, {id: 2, name: 'Jesrsy'}, {id: 3, name: 'Ambzidor'}, {
    id: 4,
    name: 'Jeep'
  }, {id: 5, name: 'BMTC Bus'}];
  uomList: {}[] = [{id: 1, name: '800'}, {id: 2, name: '600'}, {id: 3, name: '400'}, {id: 4, name: '200'}, {
    id: 5,
    name: '100'
  }];
  hasCfList: {}[] = [{id: 1, name: 'Yes'}, {id: 2, name: 'No'}];
  materialListDb: {}[] = [{'sr.no.': 1, 'brand': 'lflsfjs', 'modal': 'fsdfsfsdf', 'job': 'fsdfsdf', 'price': 46546},
    {'sr.no.': 1, 'brand': 'fddsf', 'modal': 'dddddd', 'job': 'fsdfsdf', 'price': 46546},
    {'sr.no.': 1, 'brand': 'rwerwr', 'modal': 'eeeeee', 'job': 'fsdfsdf', 'price': 46546},
    {'sr.no.': 1, 'brand': 'fsdrewr', 'modal': 'fsdfsfsdf', 'job': 'rrrr', 'price': 555555},
  ];
  rowsToDisplay: {}[] = [];
  newMaterial: {} = {};
  searchOpt: {} = {brand: '', modal: '', job: ''};
  ed: {} = {};
  lastSearchObj: {} = {};
  pageCount = 4;
  perPageCount = 2;
  activePage = 0;
  public result: any;

  constructor(private restApiService: RestApiService, private loaderService: LoaderService, private dialogsService: DialogService) {
  }

  ngOnInit() {
    this.rowsToDisplay = this.materialListDb;
    this.getMaterials(0);
  }

  perPageCountChange(perPageCount) {
    console.log(perPageCount)
    this.perPageCount = perPageCount;
    this.getMaterials(0);
  }

  getPageCount(sTerm: string, fltr: string): void {
    const url = 'http://49.50.76.29/api/material/search?search=' + sTerm + '&' + fltr + '&perPage=10&page=0';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().total)
      .subscribe(
        (value: any) => {
          this.pageCount = value;
          console.log(this.pageCount);
          this.loaderService.display(false);
        },
        (err: any) => {
          this.dialogsService
            .confirm(Constants.NOT_FOUND_TITLE, err)
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

  check(perPageCount) {
    console.log(this.perPageCount);
  }

  getMaterials(n) {
    this.lastSearchObj = {'from': 'start', '1': n};

    const url = 'http://49.50.76.29/api/material/search?search=&filter[]=name&filter[]=srno&filter[]=brand&perPage=' +
      String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.materialListDb = value;
          this.rowsToDisplay = this.materialListDb;
          console.log(n);
          console.log(this.materialListDb);
        },
        (err: any) => {
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
          console.error(err);
          console.error(err);
        }
      );
    this.getPageCount('', 'filter[]=name&filter[]=srno&filter[]=brand');
  }

  postMaterial() {
    const url = 'http://49.50.76.29/api/material/new';
    console.log(this.newMaterial);
    this.newMaterial['srno'] = "";
    this.restApiService.postRequest(url, this.newMaterial)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data[0])
      .subscribe(
        (value: {}) => {
          this.newMaterial = value;
          console.log(this.newMaterial);
          this.newMaterial = {};
          this.selPage(this.activePage);
          this.rowsToDisplay = this.materialListDb;
          console.log(this.materialListDb);
        },
        (err: any) => {
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
          console.error(err);
        }
      );
    console.log(this.materialListDb);
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
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
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
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
          console.error(err);
        }
      );
    // console.log(this.materialListDb);
  }

  addNewBrand() {
    this.brandList.push({});
  }

  addNewModal() {
    this.uomList.push({});
  }


  addPriceList(newMaterial) {
    // this.materialListDb.push(newMaterial);
    // this.rowsToDisplay=this.materialListDb
  }

  editRow(i) {
    this.ed[i] = !this.ed[i];
    this.rowsToDisplay = this.materialListDb;
  }

  delRow(item) {
    this.materialListDb.splice(this.materialListDb.indexOf(item), 1);
    //this.updateFilter1(this.searchOpt);
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

    const url = 'http://49.50.76.29/api/material/search?search=' + val +
      '&filter[]=name&filter[]=srno&filter[]=brand&perPage=' +
      String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.materialListDb = value;
          this.rowsToDisplay = this.materialListDb;
          console.log(this.materialListDb);
        },
        (err: any) => {
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
          console.error(err);
        }
      );
    console.log(this.materialListDb);
    this.getPageCount(val, 'filter[]=name&filter[]=srno&filter[]=brand');

  }

  updateFilter1(sParam, k, n) {
    this.lastSearchObj = {'from': 'ind', '1': sParam, '2': k, '3': n};
    const url = 'http://49.50.76.29/api/material/search?search=' + sParam[k] +
      '&filter[]=' + k + '&perPage=' +
      String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.materialListDb = value;
          this.rowsToDisplay = this.materialListDb;
          console.log(this.materialListDb);
        },
        (err: any) => {
          this.dialogsService
            .confirm(Constants.HTTP_ERROR_TITLE, err)
            .subscribe(res => this.result = res);
          console.error(err);
        }
      );
    console.log(this.materialListDb);
    this.getPageCount(sParam[k], 'filter[]=' + k);
  }

}
