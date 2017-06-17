import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../services/rest-api-service.service';
import {LoaderService} from '../shared/services/loader.service';
import {DialogService} from '../shared/services/dialog.service';


@Component({
  selector: 'app-labour',
  templateUrl: './labour.component.html',
  styleUrls: ['./labour.component.css'],
  providers: [DialogService]
})
export class LabourComponent implements OnInit {
  materialList: {}[]= [{id: 1, name: 'Maruthi 800'}, {id: 2, name: 'Jesrsy'}, {id: 3, name: 'Ambzidor'}, {id: 4, name: 'Jeep'}, {id: 5, name: 'BMTC Bus'}];
  brandList: {}[]= [{id: 1, name: 'Maruthi 800'}, {id: 2, name: 'Jesrsy'}, {id: 3, name: 'Ambzidor'}, {id: 4, name: 'Jeep'}, {id: 5, name: 'BMTC Bus'}];
  uomList: {}[]= ['hourly', 'daily', 'monthly'];
  typeList: any[]= ['Internal', 'Contract'];
  materialListDb: {}[]= [{'sr.no.': 1, 'brand': 'lflsfjs', 'modal': 'fsdfsfsdf', 'job': 'fsdfsdf', 'price': 46546},
  {'sr.no.': 1, 'brand': 'fddsf', 'modal': 'dddddd', 'job': 'fsdfsdf', 'price': 46546},
  {'sr.no.': 1, 'brand': 'rwerwr', 'modal': 'eeeeee', 'job': 'fsdfsdf', 'price': 46546},
  {'sr.no.': 1, 'brand': 'fsdrewr', 'modal': 'fsdfsfsdf', 'job': 'rrrr', 'price': 555555},
];
  rowsToDisplay: {}[]= [];
  newMaterial: {}= {};
  searchOpt: {}= {brand: '', modal: '', job: ''};
  ed: {}= {};
  lastSearchObj: {}= {};
  pageCount= 4;
  perPageCount= 2;
  activePage=0;

  constructor(private restApiService: RestApiService, private loaderService: LoaderService,private dialogsService: DialogService) { }

  ngOnInit() {
    this.rowsToDisplay = this.materialListDb;
    this.getMaterials(0);
  }

  perPageCountChange(perPageCount) {
    this.perPageCount=perPageCount;
    this.getMaterials(0);
  }

  getPageCount(sTerm: string, fltr: string): void{
    const url = 'http://49.50.76.29/api/labour/search?search='+ sTerm +'&' + fltr + '&perPage=10&page=0';

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().total)
      .subscribe(
        (value: any) => {
          this.pageCount = value;
          console.log(this.pageCount);
          this.loaderService.display(false);
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

  check(perPageCount) {
    console.log(this.perPageCount);
  }

  getMaterials(n) {
    this.lastSearchObj = {'from':'start','1':n};

    const url = 'http://49.50.76.29/api/labour/search?search=&filter[]=srno&filter[]=name&filter[]=age&filter[]=type&filter[]=category&filter[]=uom&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.materialListDb = value;
          this.rowsToDisplay = this.materialListDb;
          console.log(n);
          console.log(this.materialListDb);
          this.loaderService.display(false);
        },
        (err: any) => {
          console.error(err);
        }
      );
    this.getPageCount('','filter[]=srno&filter[]=name&filter[]=age&filter[]=type&filter[]=category&filter[]=uom');
  }

  postMaterial() {
    const url = 'http://49.50.76.29/api/labour/new';
    this.newMaterial['srno']=""
    this.restApiService.postRequest(url, this.newMaterial)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data[0])
      .subscribe(
        (value: {}) => {
          this.newMaterial = value;
          console.log(this.newMaterial);
          this.newMaterial={};
          this.selPage(this.activePage);
          this.rowsToDisplay = this.materialListDb;
          console.log(this.materialListDb);

        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log(this.materialListDb);
  }

  putMaterial(material) {
    const url = 'http://49.50.76.29/api/labour/' + String(material.id);

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
    const url = 'http://49.50.76.29/api/labour/' + String(material.id);

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

  addNewBrand(){
    this.brandList.push({});
  }
  addNewModal(){
    this.uomList.push({});
  }


  addPriceList(newMaterial){
    // this.materialListDb.push(newMaterial);
    // this.rowsToDisplay=this.materialListDb
  }

  editRow(i){
    this.ed[i] = !this.ed[i];
    this.rowsToDisplay = this.materialListDb;
  }
  delRow(item){
    this.materialListDb.splice(this.materialListDb.indexOf(item), 1);
    //this.updateFilter1(this.searchOpt);
  }

  updateFilter(event, n) {

    let val
    if (event){
      val = event.target.value.toLowerCase();
    }else{
      val = ""
    }
    this.lastSearchObj = {'from':'full','1':val, '2':n};

    const url = 'http://49.50.76.29/api/labour/search?search='+val+
                '&filter[]=srno&filter[]=name&filter[]=age&filter[]=type&filter[]=category&filter[]=uom&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.materialListDb = value;
          this.rowsToDisplay = this.materialListDb;
          console.log(this.materialListDb);
          this.loaderService.display(false);
        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log(this.materialListDb);
    this.getPageCount(val, 'filter[]=srno&filter[]=name&filter[]=age&filter[]=type&filter[]=category&filter[]=uom');

  }

  updateFilter1(sParam, k, n){
    this.lastSearchObj = {'from':'ind','1':sParam, '2':k, '3':n};
    const url = 'http://49.50.76.29/api/labour/search?search='+ sParam[k] +
                '&filter[]='+ k +'&perPage=' +
                String(this.perPageCount) + '&page=' + String(n);

    this.restApiService.getRequest(url)
      .map(res => /*this.loggeddInUser = <User>*/res.json().data)
      .subscribe(
        (value: {}[]) => {
          this.materialListDb = value;
          this.rowsToDisplay = this.materialListDb;
          console.log(this.materialListDb);
          this.loaderService.display(false);
        },
        (err: any) => {
          console.error(err);
        }
      );
    console.log(this.materialListDb);
    this.getPageCount(sParam[k], 'filter[]='+ k);
  }

}
